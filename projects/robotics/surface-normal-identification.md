---
layout: project
title: Surface Normal identification using RGB images
permalink: /projects/robotics/surface-normal-identification/
---

### Setup
 - We aim to perform surface normal detection using RGB images. We also identify 3D canonical co-ordinate frames for the image and their 2D projections.
 - This project is adopted from the work - Huang, J., Zhou, Y., Funkhouser, T., Guibas, L.J.: Framenet: Learning local canonical frames of 3d surfaces from a single rgb image.

### Technical Approach
 - We perform Joint-Estimation of the surface-normal(n), the 3D tangent principal directions x0, y0 and their 2D projections xi, yj. The surface normal is a 3 dimensional vector, so are the tangent principal directions xo, yo and their 2D projections xi, yj are 2 dimensional each making it a 13 dimensional vector that we can learn on.
 - The loss function is a combination of several energies (L, P, N, C, O) each of which is an L2 loss. L = L2 loss between the 2D projections of principal directions and the ground truth. P = L2 loss between the 3D tangent principal directions and the ground truth. N = L2 loss between the surface normal and its ground truth. C = L2 loss between the estimated projection(calculated from xo, yo) and the actual projection (xi, yj) of each tangent principal direction. O = L2 loss of the error in surface normal and the cross-product of the tangent directions (since the cross product of the tangent vectors should be along the normal). Total loss is simply the sum of all of these losses.
 - These 13 parameters are learnt by implementing a **DORN** architecture which has a **ResNet 101** backbone. We use the **ScanNet** dataset for training and validation and the **NYUv2** dataset for testing. With limited computational resources, we restrict to using just 10% of the dataset. 

### Results

![Map]( /assets/img/projects/icp-map.jpg )