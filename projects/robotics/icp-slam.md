---
layout: project
title: Lidar-based SLAM using ICP
permalink: /projects/robotics/icp-slam/
---

### Overview
Short intro paragraph…

### Setup
- TurtleBot + 2D Lidar
- ROS1 (Kinetic), Ubuntu 16.04

### Technical Approach
- GICP initial alignment
- Factor-graph optimization (LM)
- Loop closure with bag-of-words

### Results
- 35% drift reduction on corridor dataset
- Robust relocalization after loop

![Map]( /assets/img/projects/icp-map.jpg )