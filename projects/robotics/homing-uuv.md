---
layout: project
title: Homing, Waypoint following in an Autonomous Underwater Vehicle
permalink: /projects/robotics/homing-uuv/
---

### Setup
 - We have an AUV at some underwater location and we wish to guide to the "home" position which is a dock with co-ordinates (0,0,0) using a control algorithm.
 - The AUV is actuated by 8 thrusters that control torques along roll, pitch, yaw and the surge velocity
 - We then use the same control algorithm to make the AUV follow a set of waypoints underwater.
 - Using a SONAR attached on the AUV, we perform seabed mapping while the AUV follows some waypoints.

### Technical Approach
 - Implemented a ***sliding-surface*** control to guide an AUV from any underwater location to the origin (0,0,0) on the surface.
 - We assume a constant surge velocity v and control the heading of the AUV using the yaw and the pitch. The idea is to adjust the heading (pitch and yaw) until we are pointing "straight" to the origin. Once we are pointing towards the origin, we can purely control the surge velocity to make us move along the straight line towards the origin. We assume the "direction" to the origin is known.
 - Sliding mode control : If the current yaw, pitch are y, p and at the current instant, the yaw and pitch which point exactly towards the origin are y0, p0, then we provide an angular velocity along the yaw and pitch using :<br>
 `w_y = Ksgn(y0 - y) ; w_p = Msgn(p0 - p)`  | K, M are constants to be tuned | we get feedback on `sgn(y0-y)` and `sgn(p0-p)` | `sgn(x)` = sign of x
 - It's important to note that the control is applied while having a '**constant**' surge velocity, which means our AUV "**slides**" until we align the heading.
 - While the control-law gives us the angular velocity to be applied, we convert it to the desired thruster torque based on the dynamics of the vehicle. For the purpose of the project we operate in the conditions where the torque required is proportional to angular and linear velocities.
 - We use the above algorithm to perform waypoint-following underwater, where we also need additional downward thrust to counter the upward force of water.
 - We then perform SONAR-based mapping of the seabed topography while navigating underwater simply using point-cloud data and transforming it into the world-frame considering we know the state (position, orientation) of the AUV.

### Results

![Map]( /assets/img/projects/icp-map.jpg )