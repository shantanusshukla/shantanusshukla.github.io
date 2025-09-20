---
layout: project
title: Search and sampling-based planning in 2D, 3D mazes/spaces
permalink: /projects/robotics/path-planning-2d3d/
---

### 3D Spaces
  ### Setup
  - We are given several 3D spaces with formed using **Axis-aligned Bounding boxes**. A start and a goal position is given and the goal is to find a path from the start to the goal position.

  ### Technical Approach
  - We write a function based on geometry to determine whether a segment collides with a given axis-aligned bounding box
  - **Search Based** : we use a **weighted A-star** search where the weight is added along with the heuristic. A high weight aggressively moves us towards goal (meaning the path can be sub-optimal) whereas a low weight explores more (meaning more time to find a path but more likely an optimal one with respect to the discretization performed)
  - **Sampling Based** : we use **RRT-star** and **RRT-connect** algorithms. While RRTs explore spaces rapidly, they do take time in case the path to the goal goes through narrow gaps like in mazes. RRT-connect is relatively faster since it contains trees exploring from both the goal-side and the start-side. Jagged paths obtained are pruned.

### 2D Mazes
  ### Setup
  - We are given 2D mazes, where we implement search-based algorithms going from a start to a goal location

  ### Technical Approach
  - We implement BFS, DFS and A-star algorithms, with multiple heuristics in A-star. 
  - We observe how BFS and A-star provide optimal paths while DFS doesn't.

### Results

![Map]( /assets/img/crepe.jpg )