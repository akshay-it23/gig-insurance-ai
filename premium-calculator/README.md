# Weekly Premium Calculator

## Overview

This module calculates the weekly insurance premium for delivery workers based on environmental risk factors.

The premium changes dynamically depending on the level of risk in the worker's operating area using real-time weather data.

## Input

* City name

## Data Source

* Rainfall level (from OpenWeather API)
* Humidity level (used as environmental risk indicator)

## Output

* Risk level (Low, Medium, High)
* Weekly premium amount

## Premium Calculation Logic

Risk Score = (Rainfall × 0.6) + (Humidity × 0.4)

Premium Model:

* Low Risk → ₹100
* Medium Risk → ₹200
* High Risk → ₹300

## Purpose

This module demonstrates dynamic premium calculation for a parametric insurance platform designed for gig economy delivery workers.