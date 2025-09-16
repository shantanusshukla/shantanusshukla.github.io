---
layout: project
title: Visual-Inertial SLAM with Kalman Filters (KF, EKF)
permalink: /projects/robotics/vislam/
---

### Setup
 - **Stereo cameras** installed on the car capture images at fixed intervals and certain landmarks are already identified. The location of these landmarks in the left and the right camera is already provided to us as a part of the image data.  We also have the information on which landmarks are obtained in which camera frame over time.
 - IMU on the car provides - angular and linear accelerations. Vehicle Motion model - given by Pose Dynamics in **SE(3)**. 
 - We wish to get the best estimate of the path taken by the vehicle and the location of the landmarks using an **Extended Kalman Filter**.

### Technical Approach
 - Landmark Prior and raw vehicle trajectory : We first obtain the raw trajectory (position, orientation) by integrating IMU data over time. From the image data, knowing the camera calibration matrix, we obtain a "**prior**" estimate of landmark locations in the camera frame, and then in the world frame by transformation (since the vehicle pose is known).
 - Assuming a noisy observation model, we calculate the "**expected measurement**" of pixel-co-ordinates for each landmark at each time instant. Using the error between the actual measurement and the expected measurement and an **Extended Kalman Filter** (Kalman gain calculated using the derivative of the non-linear camera projection function) we update our estimate of the landmark positions in the world. We also calculate the uncertainty in the landmark positions.
 - Using these updated landmark positions we calculate the "**updated**" pose of the vehicle for that instant (by essentially using the **exponential of the hat map** of the innovation term, since vehicle pose is in **SE(3)** - check project report for more info).
 - Finally, using the Kalman Gain, we update the uncertainty in the vehicle pose and the landmark locations. Using this new uncertainty we move to the next time step and repeat the above two steps. The Kalman gain for the next step basically uses this updated uncertainty. 

### Results

![Map]( /assets/img/projects/icp-map.jpg )