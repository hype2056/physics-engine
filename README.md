# Physics Engine

A 2D rigid-body physics engine built from scratch in vanilla JavaScript with no libraries or frameworks.

## What's built from scratch
- Game loop running at 60fps using requestAnimationFrame
- Gravity simulation with acceleration applied every frame
- Elastic wall collisions with restitution coefficient
- Pythagorean distance-based collision detection between bodies
- Impulse resolution using dot products and collision normals
- Overlap correction to prevent bodies clipping through each other
- Mass-weighted momentum exchange between colliding bodies

## How it works
Every frame, each ball's velocity is updated by gravity, then its position is updated by its velocity. When two balls collide, the engine calculates the collision normal, takes the dot product of their relative velocities, and exchanges momentum proportionally to their masses.

## Tech
JavaScript, HTML Canvas API

## Run
No setup needed. Just clone the repo and open `index.html` in your browser.
