---
title: Value Iteration Algorithm
date: 2021-03-21
description: An agent that plays a simple 3-dice game
tags:
  - AI
---

In this post I'll show how you can create an agent to play a simple 3-dice game, this problem can be modelled using the the Markov 
Decision Process.

A Markov decision process is a particular type of process that has the Markov property. Put in simple terms, this means that our 
actions only need to depend on the current state: it does not matter what path we took to get to this particular point. In trying 
to develop the optimal policy we can use the **Bellman** equation. 

## Game Rules

- You start with 0 points
- Roll three fair six-sided dice
- Choose one of the following:
  1. Stick, accept the values shown.
    - If two or more dice show the same values, then all of them are flipped upside down (1 becomes 6, 2 becomes 5, 3 becomes 4, 
    and vice versa)
    - The total is then added to your points and this is your final score.
  2. OR reroll the dice.
    - You may choose to hold any combination of the dice on the current value shown.
    - Rerolling costs you 1 point – so during the game and perhaps even at the end your score may be negative.
    - You then make this same choice again.

## Things to note
- The best possible score for this game is 18 and is achieved by rolling three 1s on the first roll.
- The reroll penalty prevents you from rolling forever to get this score. If the value of the current dice is greater than the 
expected value of 
rerolling them (accounting for the penalty), then you should stick.

It is pretty obvious that you should stick on three 1s, and reroll on three 6s. Should you hold any of the 6s when you reroll? 
What about other values? What should you do if the dice come up 3, 4, 5?


We will define a simple `play` method to return an "action", that is to say which dice to stick with:

```py
    def play(self, state):
        return self.policy[state]
```

## Implementation

The make-up of our agent class, notice the `self.iterate` method (we will cover it shortly) which develops a set of policies our 
agent will use to play the game.

```py
class MyAgent(DiceGameAgent):
    def __init__(self, game):
        super().__init__(game)

        # Tune hyper-parameters
        self.theta = 0.001
        self.gamma = 0.97

        # initialise value map/dict
        self.value_map = dict()
        self.policy = dict()

        for state in self.game.states:
            self.value_map[state] = game.final_score(state)

        # "Cache" a list of states in-memory for faster look-up and avoid recalculating via get_next_states()
        self.buffer = dict()

        # The main iteration until delta is less than theta
        delta = self.theta + 1
        while delta > self.theta:
            delta = self.iterate()
```

### Value Iteration

Here, we will implement value iteration that calculates an _optimal policy_ for the agent using the Bellman equation
which can be defined as a recursive equation that represents the value of a state in terms of the values of successor states, 
plus any rewards gained between the two.

We can start by assigning an initial value of 0 to each state and then use the Bellman equation to find the optimal values for 
each state and the action that produces it.

Our `iterate` function:

```py
    def iterate(self):
        delta = 0

        # Iterate over all states
        for state in self.game.states:
            # Reset best action at the start of each state
            best_action_value = -1000

            # keep value in temp
            previous_best = self.value_map[state]

            # Try all possible actions
            for action in self.game.actions:
                state_total_prob = self.calculate_total_probability(action, state)

                if state_total_prob > best_action_value:
                    best_action_value = state_total_prob
                    optimal_action = action

            self.value_map[state] = best_action_value
            self.policy[state] = optimal_action

            delta = max(delta, abs(previous_best - best_action_value))

        return delta


    def calculate_total_probability(self, action, state):
        # Get the values based on the action-states in "cache"
        # Add action-state to cache if its not been seen before

        if (action, state) not in self.buffer:
            self.buffer[(action, state)] = self.game.get_next_states(action, state)

        output_states, game_over, reward, probabilities = self.buffer.get((action, state))
        state_total_prob = 0

        # Iterate over probabilities per state
        for out_state, probability in zip(output_states, probabilities):
            if not game_over:
                state_total_prob += probability * (reward + self.gamma * self.value_map.get(out_state))
            else:
                state_total_prob += probability * (reward + self.gamma * self.game.final_score(state))

        return state_total_prob
```

## Hyperparameters

### Gamma

This is the discount factor - the hyperparameter that can be tuned to emphasize the long-term reward or make the model pick 
the best short-term solution. 0.97 was a conservative estimate for this having consdiered the trade-off between performance 
and success.

### Theta

Set to 0.001, it was apparent increasing theta would improve run-time and impair success of the algorithm. This was set after 
making the trade-off between performance and success.


### Performance

n = 10,000 (games)

```log
theta = 0.01
gamma = 0.95
Worst score:......... -10
Average score:....... 13.3012
Best score:.......... 18
Average time/game:... 0.0004879 seconds
Total time:.......... 4.8788 seconds


theta = 0.001
gamma = 0.95
Worst score:......... -8
Average score:....... 13.3221
Best score:.......... 18
Average time/game:... 0.0004768 seconds
Total time:.......... 4.7677 seconds


theta = 0.0001
gamma = 0.95
Worst score:......... -4
Average score:....... 13.3269
Best score:.......... 18
Average time/game:... 0.0004987 seconds
Total time:.......... 4.9873 seconds


theta = 0.0001
gamma = 0.97
Worst score:......... -6
Average score:....... 13.3415
Best score:.......... 18
Average time/game:... 0.0005377 seconds
Total time:.......... 5.3769 seconds


theta = 0.001
gamma = 0.97
Worst score:......... -8
Average score:....... 13.3966
Best score:.......... 18
Average time/game:... 0.0006144 seconds
Total time:.......... 6.1443 seconds

```

Thanks for reading! 

Pratik Thanki ✌️
