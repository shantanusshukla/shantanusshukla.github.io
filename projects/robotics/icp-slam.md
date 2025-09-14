---
layout: project
title: Lidar-based SLAM using ICP
permalink: /projects/robotics/icp-slam/
---

### Overview
Short intro paragraph…

### Setup
 - We first have to set up an **Iterative Point-Cloud Matching** framework. The goal is generate an occupancy 
   map with ICP on LiDAR data obtained from a mobile robot, along with a texture map of the ground using images obtained from a camera.
 - Finally, we have to perform Factor-graph SLAM to obtain the robot trajectory.

### Technical Approach
- **Iterative Point-Cloud** matching - 
    - We perform scan-matching on two sets of point-clouds using the ICP algorithm invoking the **Kabsch      Algorithm** and determine the avg. relative orientation between two sets of 
    point-clouds. This sets up a function for data-association given two sets of point clouds.
- **Lidar-based SLAM** - 
    - We used ICP on Lidar data (LiDAR mounted on bot) of consecutive time-steps to determine the relative pose between the current and previous poses of the bot and generated a trajectory estimate using the sequence of relative poses obtained
    - Implemented **Factor-Graph SLAM** using the sequence of relative poses and fixed-interval loop-closure using the **GTSAM** library to optimize the trajectory estimate - compared this with the raw estimate and Odometry based-estimate.
- **Occupancy and Texture Mapping** - 
    - We generate a 2D occupancy map from the LiDAR scan data by first transforming points from the LiDAR frame to the world frame(since the orientation of the bot is now known) and then using the **Bresenham2D** algorithm. We assign a probability to every point on the map of being occupied, free or unexplored and map it on a color-bar as shown below. By overlaying images obtained from a ground-facing camera on this occupancy map, we create a texture map.

### Results
- 35% drift reduction on corridor dataset
- Robust relocalization after loop

![Map]( /assets/img/projects/icp-map.jpg )