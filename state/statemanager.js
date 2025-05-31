class StateManager {
  constructor() {
    this.states = new Map();
    this.currentState = null;
    this.previousState = null;
    this.isTransitioning = false;
    this.transitionData = null;
  }

  // Register a new state
  addState(name, stateClass) {
    if (typeof stateClass !== 'function') {
      console.error(`State ${name} must be a class or constructor function`);
      return;
    }
    this.states.set(name, stateClass);
  }

  // Switch to a different state
  switchTo(stateName, transitionData = null) {
    if (!this.states.has(stateName)) {
      console.error(`State '${stateName}' not found`);
      return false;
    }

    // Store previous state for potential rollback
    this.previousState = this.currentState;
    
    // Exit current state if it exists
    if (this.currentState && typeof this.currentState.exit === 'function') {
      this.currentState.exit();
    }

    // Create new state instance
    const StateClass = this.states.get(stateName);
    this.currentState = new StateClass();
    this.currentState.name = stateName;
    this.transitionData = transitionData;

    // Initialize new state
    if (typeof this.currentState.init === 'function') {
      this.currentState.init(transitionData);
    }

    console.log(`Switched to state: ${stateName}`);
    return true;
  }

  // Go back to previous state
  goBack() {
    if (this.previousState) {
      const prevStateName = this.previousState.name;
      this.switchTo(prevStateName);
    }
  }

  // Get current state name
  getCurrentStateName() {
    return this.currentState ? this.currentState.name : null;
  }

  // Update current state
  update() {
    if (this.currentState && typeof this.currentState.update === 'function') {
      this.currentState.update();
    }
  }

  // Draw current state
  draw() {
    if (this.currentState && typeof this.currentState.draw === 'function') {
      this.currentState.draw();
    }
  }

  // Handle key presses
  keyPressed() {
    if (this.currentState && typeof this.currentState.keyPressed === 'function') {
      this.currentState.keyPressed();
    }
  }

  // Handle mouse presses
  mousePressed() {
    if (this.currentState && typeof this.currentState.mousePressed === 'function') {
      this.currentState.mousePressed();
    }
  }

  // Handle key releases
  keyReleased() {
    if (this.currentState && typeof this.currentState.keyReleased === 'function') {
      this.currentState.keyReleased();
    }
  }

  // Handle mouse releases
  mouseReleased() {
    if (this.currentState && typeof this.currentState.mouseReleased === 'function') {
      this.currentState.mouseReleased();
    }
  }
}
