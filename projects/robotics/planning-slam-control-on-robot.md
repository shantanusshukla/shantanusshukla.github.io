---
layout: project
title: Vision-based SLAM using April Tags, Planning, Control and Area Coverage on a wheeled robot
permalink: /projects/robotics/planning-slam-control-on-robot/
---

### Setup
 - On the **Qualcomm RB5** robots (differential drive) we aim to setup the entire **Perception-Localization-Mapping-Planning-Control** pipeline to navigate an arena surrounded with AprilTags and containing obstacles. We aim to implement a **Kalman Filter** for localization and designing a plan to move the bot around the arena such that we achieve **> 80%** coverage.

### Technical Approach
 - **Calibration and Control** - Control commands provided are motor velocities for each of the 4 wheels. We first create a calibration matrix for the motor that scales the input values such that all motors have the correct desired value of angular velocity for rotation. This needs to be done since there are non-uniformities in the commands provided and the output generated for each motor. Moving from one pose to another - done using a PID control, where feedback on the robot pose is provided using AprilTags.
 - **Perception** - We calibrate a monocular camera mounted on the robot and perform April-Tag detection using OpenCV. This provides us the pose of the AprilTag in the frame of the camera. 
 - **Localization and Mapping** - We place AprilTags at fixed locations around the arena, and hence we determine the robot pose by transforming the above camera-frame measurement first into the AprilTag frame and then into the world frame. Of course the measurements are noisy and we implement a Kalman Filter to perform localization and mapping. We make the robot move around in various shapes in the arena (like a square, triangle, hexagon etc.) multiple times to improve our mapping estimates. We observe that robot motion is ~5-10cm off the desired motion given the noisy measurements. 
 - **Motion Planning** - Waypoints are followed using a PID control, the feedback for which is received using the above SLAM strategy. Hence in planning, we generate a set of waypoints to be followed. Using an A-star algorithm with Euclidean and Manhattan heuristics, we generate shortest and safest paths to the goal positions and discretize them into waypoints for the robot to follow. 
 - **Arena Coverag**e - Using the above pipeline, we provide the robot with a path that starts from the boundary of the arena and spirals inwards to the center of the square arena, with a pitch small enough to ensure that most of the area is covered.

*Refer to the reports for more details on the setup and implementation which is done using Python and ROS. Algorithm codes are stored and implemented on the robot microcontroller and can be edited using a remote connection (ssh).*


### Results


![Map]( /assets/img/projects/icp-map.jpg )