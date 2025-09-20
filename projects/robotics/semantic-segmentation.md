---
layout: project
title: Semantic Segmentation with FCNs
permalink: /projects/robotics/semantic-segmentation/
---

### Setup
 - We aim to use Fully Convolutional Neural Networks for Semantic Segmentation of images
### Technical Approach
 - We use the VGG-16 backbone. FCN-32 is a small variation of VGG-16 with 1x1 convolutions in place of fully-connected layers and a Transpose convolution at the end to give a dense prediction output. There are NO skip connections.
 - We then use the FCN-8 architecture we pretrained weights and compare the performance with FCN-32. Clearly FCN-8 with skip connections, gives a better output given the unsampling factor of 8 which helps capture finer features. Skip connections help combine low resolution and high resolution outputs to give a better segmentation result.

### Results

![Map]( /assets/img/projects/icp-map.jpg )