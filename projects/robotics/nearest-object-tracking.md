---
layout: project
title: Nearest-Object Tracking with Model Predictive Control
permalink: /projects/robotics/nearest-object-tracking/
---

### Setup
 - We have multiple solid objects moving on specific trajectories in 3D space.
 - Using a camera mounted on the end-effector of a 7-DOF  robotic arm, we wish to center the track (maintain at the image center) the object closest to the camera
 - We design a Model-Predictive Controller to perform tracking and compare the performance with a baseline PID controller.
### Technical Approach
 - We first identify the pixel-coordinates of the nearest object using the camera position, orientation, object location and the camera calibration matrix by simply taking a projection in 2D in the frame of the camera.
 - We design our control in the pixel-coordinate space where the state is the location of the object X = [u, v] in the image. The control space is the joint velocities of the robot  U = [q1, q2, q3, q4, q5, q6, q7].
 - Motion model - Given the joint velocities at the current time step, we "predict" what the state would be at the next time step. Using an Euler-discretized model, we first calculate the joint angles for the next time step. Based on the robot D-H parameters we then find the end-effector pose which then helps us to take a projection in the camera frame to predict the pixel coordinates.
 - Based on this motion model we formulate a Nonlinear Optimization problem in CasADi with a quadratic cost function considering the error in the state, the magnitude of the control input and a penalty for moving joint angles to extremities.
 - The above problem is solved using an IPOPT solver with a prediction horizon of N = 10.

### Results

![Map]( /assets/img/projects/icp-map.jpg )