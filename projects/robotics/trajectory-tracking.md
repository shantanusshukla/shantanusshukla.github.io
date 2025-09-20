---
layout: project
title: Trajectory Tracking with Finite and Infinite horizon Optimal Control
permalink: /projects/robotics/trajectory-tracking/
---

### Setup
 - Blue marker traces a path (a lissajous curve) marked by blue crosses. The red marker is a tracker, which tries to track the trajectory of the blue marker while avoiding obstacles.
 - The motion model for both of them is a **unicycle model**

### Technical Approach
- The state of the bodies is given by the x, y co-ordinates of the position and the orientation θ. The control inputs are linear and angular velocities.
- We define the error dynamics based on the motion model where
***error = (expected state) - (actual state) + noise*** : we consider Gaussian Noise.
- We define a **quadratic loss** function in terms of the error, find a sequence of control inputs which minimize the expected value of the loss function over a time horizon.
- Ideally, we would want the time horizon to be infinite (which gives us a **control policy** - where you can query the optimal control input as a function of the state of the system). Another approach is to keep the time-horizon finite - which would mean we reduce the number of the optimization variables and quick optimizations mean that we can use this real-time. Note: it is crucial to know the "entire" reference trajectory in the former approach, whereas in the latter, we can do with knowing just for the next few time steps.
- **Certainty Equivalent Control** - *Similar to MPC*
    - Finite-Horizon NLP - solved using **CasADi**. **CasADi**  has several NLP solvers. We use **IPOPT**. Since we are performing numerical optimizations, our state and control spaces can be continuous with relevant constraints.
- **Infinite Horizon Optimal Control**
    - We perform Generalized Policy Iteration to solve this infinite-horizon problem. To implement this, we need a discrete state-space, motion model with Gaussian Noise and hence we discretize the (x,y,θ) variables with fixed interval steps. 
    - We discretize the motion model by using the "nearest neighbors" to the state obtained out of the discrete states. 

### Results

![Map]( /assets/img/projects/icp-map.jpg )