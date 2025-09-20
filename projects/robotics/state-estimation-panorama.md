---
layout: project
title: Sensor Calibration, Orientation tracking and Panorama stitching
permalink: /projects/robotics/state-estimation-panorama/
---

### Setup
 - We are provided with time-stamped IMU data, camera images (RGB) from a mobile robot along with VICON data for the orientation of the body of the robot. We wish to calibrate the noisy IMU measurements and estimate the orientations and accelerations of the body and compare them with the ground truth (VICON data).
 - Based on the obtained orientations, we wish to stitch a panorama from images captured from the camera in these orientations.
### Technical Approach
 - We calibrate the IMU data based on the accelerometer and gyro sensitivities from the IMU datasheet and eliminate initial unstable readings.
 - Based on the quaternion-kinematics motion model we obtain the "optimal" sequence of quaternions (orientations) that minimizes the error in the observed data while also obeying the motion model. This is done using Projected Gradient Descent. Check detailed optimization cost function (quadratic loss) in the report.
 - With the corrected orientations, we transform the images from the camera frame to the world frame and project them on a 2D plane to stitch a panorama.

### Results

![Map]( /assets/img/projects/icp-map.jpg )