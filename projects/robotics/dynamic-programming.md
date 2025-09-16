---
layout: project
title: Navigating Door-Key-Obstacle mazes using Dynamic Programming
permalink: /projects/robotics/dynamic-programming/
---

### Setup
 - Known goal locations, start locations, unknown key / door locations
 - **5x5**, **6x6**, **7x7**, **8x8** environments : discrete state-space
 - Find the shortest path to goal while performing the following tasks:
    - *pick the key (only if  necessary)*
    - *open the door (if  closed)*
    - *reach the goal*
    - *avoid obstacles*

### Technical Approach
- Problem formulated as a **Markov Decision Process** with the following
    - ***state-space*** : *x = [i, j, d, key_status, door _ status]* where *i*, *j* are the co-ordinates in x and y of the marker, d is the heading direction which can be *(L, R, U, D)* for *(left, right, up, down)* respectively, *key_status* is 0 or 1 depending on whether we have the key or not and *door_status* is 0 or 1 depending on whether a particular door is open or close.
    - ***control-space*** : *U = {MF, T L, T R, PK, UD}* where (MF = move forward, TL = turn left, TR = turn right, PK = pick key, UD = unlock door)
    - ***stage and terminal costs*** : 
        - stage-cost = 1 to move/turn or basically implement any of the control actions when we are NOT reaching the goal in the next step.
        - stage-cost = 0 to move/turn or implement a control action that takes us to the goal
        - terminal-cost = 0 if we are at the goal else ∞
        - Cost function for Dynamic Programming : **V = stage cost + terminal cost**
- Solved using the  Dynamic Programming Algorithm. For the detailed algorithm check the report.

### Results

![Map]( /assets/img/projects/icp-map.jpg )