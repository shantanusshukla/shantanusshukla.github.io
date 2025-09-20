---
layout: project
title: Visual servoing on the Franka-Emika Panda manipulator
permalink: /projects/robotics/visual-servoing/
---

### Setup
 - We have a solid block placed on the ground (X-Y plane) and the Franka-Emika Panda 7-DOF robot arm with a camera mounted on the end-effector.
 - The goal is to position the end-effector such that the solid block lies at the center of the image while the block is stationary and while it is moving. Further, we also deploy a null-space controller to minimize the roll of the camera. 

### Technical Approach
 - We obtain the pixel co-ordinates of the block from the image using OpenGL, based on which we calculate the Image Jacobian - the relation between the object velocity in pixel-space with the linear and angular velocities of the end-effector (camera). The "desired velocity" in pixel-space is calculated based on the desired and current position in the pixel-space.
 - The velocity is pixel-space is translated to the world-frame through the Image Jacobian, which is further transformed into the joint-space using the joints Jacobian for the robot arm. 
 - We apply a proportional controller for the joints to move the robot arm to the desired configuration.
 - For Null-space control, we find the camera roll (r) as a function of the joint angles (q) based on the D-H parameters obtained from the Franka-Emika-Panda docs here - https://frankaemika.github.io/docs/control_parameters.html#denavithartenberg-parameters. We encode this in *sympy* to calculate the gradient of the roll with respect to the joint angles.
 - The null-space control term is finally calculated using q_null = (I - J'J)Dq where q_null is the null-space control command and Dq is the gradient.  

### Results

![Map]( /assets/img/projects/icp-map.jpg )