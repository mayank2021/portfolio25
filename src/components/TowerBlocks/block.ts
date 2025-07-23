import * as THREE from "three";
import { TweenLite, Power1 } from "gsap";

// Type definitions
interface BlockReturn {
  placed?: THREE.Mesh;
  chopped?: THREE.Mesh;
  plane: "x" | "y" | "z";
  direction: number;
  bonus?: boolean;
}

interface GSAPParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: string | number | (() => void) | ((...args: any[]) => any);
}

class Stage {
  private container: HTMLElement | null;
  private camera: THREE.OrthographicCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private light: THREE.DirectionalLight;
  private softLight: THREE.AmbientLight;

  constructor() {
    this.container = document.getElementById("game");

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });

    // Use container dimensions instead of window dimensions
    const width = this.container?.clientWidth || window.innerWidth;
    const height = this.container?.clientHeight || window.innerHeight;

    this.renderer.setSize(width, height);
    this.renderer.setClearColor("#111", 1);
    this.container?.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    const aspect = width / height;
    const d = 20;
    this.camera = new THREE.OrthographicCamera(
      -d * aspect,
      d * aspect,
      d,
      -d,
      -100,
      1000
    );
    this.camera.position.set(2, 2, 2);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.light = new THREE.DirectionalLight(0xffffff, 0.5);
    this.light.position.set(0, 499, 0);
    this.scene.add(this.light);

    this.softLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(this.softLight);

    window.addEventListener("resize", () => this.onResize());
    this.onResize();
  }

  setCamera(y: number, speed: number = 0.3) {
    TweenLite.to(this.camera.position, speed, {
      y: y + 4,
      ease: Power1.easeInOut,
    });
    TweenLite.to(this.camera.lookAt, speed, { y, ease: Power1.easeInOut });
  }

  onResize() {
    const viewSize = 30;
    // Use container dimensions instead of window dimensions
    const width = this.container?.clientWidth || window.innerWidth;
    const height = this.container?.clientHeight || window.innerHeight;

    this.renderer.setSize(width, height);
    this.camera.left = width / -viewSize;
    this.camera.right = width / viewSize;
    this.camera.top = height / viewSize;
    this.camera.bottom = height / -viewSize;
    this.camera.updateProjectionMatrix();
  }

  render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  add = (elem: THREE.Object3D) => {
    this.scene.add(elem);
  };

  remove = (elem: THREE.Object3D) => {
    this.scene.remove(elem);
  };

  dispose = () => {
    // Remove renderer from DOM
    if (this.container && this.renderer.domElement.parentNode) {
      this.container.removeChild(this.renderer.domElement);
    }

    // Dispose of renderer
    this.renderer.dispose();

    // Clear scene
    this.scene.clear();
  };
}

class Block {
  private STATES = { ACTIVE: "active", STOPPED: "stopped", MISSED: "missed" };
  private MOVE_AMOUNT = 12;

  dimension = { width: 0, height: 0, depth: 0 };
  position = { x: 0, y: 0, z: 0 };

  mesh: THREE.Mesh;
  state: string;
  index: number;
  speed: number;
  direction: number;
  colorOffset: number;
  color: THREE.Color | number;
  material: THREE.MeshToonMaterial;

  workingPlane: "x" | "z";
  workingDimension: "width" | "depth";

  targetBlock: Block;

  constructor(block: Block) {
    this.targetBlock = block;
    this.index = (this.targetBlock ? this.targetBlock.index : 0) + 1;
    this.workingPlane = this.index % 2 ? "x" : "z";
    this.workingDimension = this.index % 2 ? "width" : "depth";

    this.dimension.width = this.targetBlock
      ? this.targetBlock.dimension.width
      : 10;
    this.dimension.height = this.targetBlock
      ? this.targetBlock.dimension.height
      : 2;
    this.dimension.depth = this.targetBlock
      ? this.targetBlock.dimension.depth
      : 10;

    this.position.x = this.targetBlock ? this.targetBlock.position.x : 0;
    this.position.y = this.dimension.height * this.index;
    this.position.z = this.targetBlock ? this.targetBlock.position.z : 0;

    this.colorOffset = this.targetBlock
      ? this.targetBlock.colorOffset
      : Math.round(Math.random() * 100);

    if (!this.targetBlock) {
      this.color = 0xffeaea; // Light gray for base block
    } else {
      const offset = this.index + this.colorOffset;
      const r = Math.sin(0.3 * offset) * 80 + 175; // Range: 95-255 (lighter)
      const g = Math.sin(0.3 * offset + 2) * 80 + 175; // Range: 95-255 (lighter)
      const b = Math.sin(0.3 * offset + 4) * 80 + 175; // Range: 95-255 (lighter)
      this.color = new THREE.Color(r / 255, g / 255, b / 255);
    }

    this.state = this.index > 1 ? this.STATES.ACTIVE : this.STATES.STOPPED;
    this.speed = -0.1 - this.index * 0.005;
    if (this.speed < -4) this.speed = -4;
    this.direction = this.speed;

    const geometry = new THREE.BoxGeometry(
      this.dimension.width,
      this.dimension.height,
      this.dimension.depth
    );
    geometry.applyMatrix4(
      new THREE.Matrix4().makeTranslation(
        this.dimension.width / 2,
        this.dimension.height / 2,
        this.dimension.depth / 2
      )
    );
    this.material = new THREE.MeshToonMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);

    if (this.state === this.STATES.ACTIVE) {
      this.position[this.workingPlane] =
        Math.random() > 0.5 ? -this.MOVE_AMOUNT : this.MOVE_AMOUNT;
    }
  }

  reverseDirection() {
    this.direction = this.direction > 0 ? this.speed : Math.abs(this.speed);
  }

  place(): BlockReturn {
    this.state = this.STATES.STOPPED;
    const overlap =
      this.targetBlock.dimension[this.workingDimension] -
      Math.abs(
        this.position[this.workingPlane] -
          this.targetBlock.position[this.workingPlane]
      );

    const blocksToReturn: BlockReturn = {
      plane: this.workingPlane,
      direction: this.direction,
    };

    if (this.dimension[this.workingDimension] - overlap < 0.3) {
      this.position.x = this.targetBlock.position.x;
      this.position.z = this.targetBlock.position.z;
      this.dimension.width = this.targetBlock.dimension.width;
      this.dimension.depth = this.targetBlock.dimension.depth;
      blocksToReturn.bonus = true;
    }

    if (overlap > 0) {
      const choppedDimensions = { ...this.dimension };
      choppedDimensions[this.workingDimension] -= overlap;
      this.dimension[this.workingDimension] = overlap;

      const placedGeometry = new THREE.BoxGeometry(
        this.dimension.width,
        this.dimension.height,
        this.dimension.depth
      );
      placedGeometry.applyMatrix4(
        new THREE.Matrix4().makeTranslation(
          this.dimension.width / 2,
          this.dimension.height / 2,
          this.dimension.depth / 2
        )
      );
      const placedMesh = new THREE.Mesh(placedGeometry, this.material);

      const choppedGeometry = new THREE.BoxGeometry(
        choppedDimensions.width,
        choppedDimensions.height,
        choppedDimensions.depth
      );
      choppedGeometry.applyMatrix4(
        new THREE.Matrix4().makeTranslation(
          choppedDimensions.width / 2,
          choppedDimensions.height / 2,
          choppedDimensions.depth / 2
        )
      );
      const choppedMesh = new THREE.Mesh(choppedGeometry, this.material);

      const choppedPosition = { ...this.position };
      if (
        this.position[this.workingPlane] <
        this.targetBlock.position[this.workingPlane]
      ) {
        this.position[this.workingPlane] =
          this.targetBlock.position[this.workingPlane];
      } else {
        choppedPosition[this.workingPlane] += overlap;
      }

      placedMesh.position.set(
        this.position.x,
        this.position.y,
        this.position.z
      );
      choppedMesh.position.set(
        choppedPosition.x,
        choppedPosition.y,
        choppedPosition.z
      );

      blocksToReturn.placed = placedMesh;
      if (!blocksToReturn.bonus) blocksToReturn.chopped = choppedMesh;
    } else {
      this.state = this.STATES.MISSED;
    }

    return blocksToReturn;
  }

  tick() {
    if (this.state === this.STATES.ACTIVE) {
      const value = this.position[this.workingPlane];
      if (value > this.MOVE_AMOUNT || value < -this.MOVE_AMOUNT)
        this.reverseDirection();
      this.position[this.workingPlane] += this.direction;
      this.mesh.position[this.workingPlane] = this.position[this.workingPlane];
    }
  }
}

export class Game {
  private STATES = {
    LOADING: "loading",
    PLAYING: "playing",
    READY: "ready",
    ENDED: "ended",
    RESETTING: "resetting",
  };

  private blocks: Block[] = [];
  private state: string = this.STATES.LOADING;

  private newBlocks: THREE.Group;
  private placedBlocks: THREE.Group;
  private choppedBlocks: THREE.Group;

  private scoreContainer: HTMLElement | null;
  private mainContainer: HTMLElement | null;
  private startButton: HTMLElement | null;
  private instructions: HTMLElement | null;

  private stage: Stage;
  private animationId: number | null = null;
  private keydownHandler: (e: KeyboardEvent) => void;
  private clickHandler: () => void;
  private touchstartHandler: (e: TouchEvent) => void;
  private onGameEnd?: (score: number) => void;
  private inputDisabled: boolean = false;

  constructor(onGameEnd?: (score: number) => void) {
    this.onGameEnd = onGameEnd;
    this.stage = new Stage();

    this.mainContainer = document.getElementById("container");
    this.scoreContainer = document.getElementById("score");
    this.startButton = document.getElementById("start-button");
    this.instructions = document.getElementById("instructions");
    if (this.scoreContainer) {
      this.scoreContainer.innerHTML = "0";
    }

    this.newBlocks = new THREE.Group();
    this.placedBlocks = new THREE.Group();
    this.choppedBlocks = new THREE.Group();

    this.stage.add(this.newBlocks);
    this.stage.add(this.placedBlocks);
    this.stage.add(this.choppedBlocks);

    this.addBlock();
    this.animationId = 0; // Initialize animation ID
    this.tick();
    this.updateState(this.STATES.READY);

    // Store event handlers for cleanup
    this.keydownHandler = (e: KeyboardEvent) => {
      if (e.key === " ") this.onAction();
    };
    this.clickHandler = () => this.onAction();
    this.touchstartHandler = (e: TouchEvent) => e.preventDefault();

    document.addEventListener("keydown", this.keydownHandler);
    document.addEventListener("click", this.clickHandler);
    document.addEventListener("touchstart", this.touchstartHandler);
  }

  private updateState(newState: string) {
    if (!this.mainContainer) return;

    for (const key in this.STATES) {
      this.mainContainer.classList.remove(
        this.STATES[key as keyof typeof this.STATES]
      );
    }
    this.mainContainer.classList.add(newState);
    this.state = newState;
  }

  private onAction() {
    if (this.inputDisabled) return;

    switch (this.state) {
      case this.STATES.READY:
        this.startGame();
        break;
      case this.STATES.PLAYING:
        this.placeBlock();
        break;
      case this.STATES.ENDED:
        this.restartGame();
        break;
    }
  }

  private startGame() {
    if (this.state !== this.STATES.PLAYING) {
      if (this.scoreContainer) {
        this.scoreContainer.innerHTML = "0";
      }
      this.updateState(this.STATES.PLAYING);
      this.addBlock();
    }
  }

  private restartGame() {
    this.updateState(this.STATES.RESETTING);

    const oldBlocks = this.placedBlocks.children;
    const removeSpeed = 0.2;
    const delayAmount = 0.02;

    for (let i = 0; i < oldBlocks.length; i++) {
      TweenLite.to(oldBlocks[i].scale, removeSpeed, {
        x: 0,
        y: 0,
        z: 0,
        delay: (oldBlocks.length - i) * delayAmount,
        ease: Power1.easeIn,
        onComplete: () => {
          this.placedBlocks.remove(oldBlocks[i]);
        },
      });
      TweenLite.to(oldBlocks[i].rotation, removeSpeed, {
        y: 0.5,
        delay: (oldBlocks.length - i) * delayAmount,
        ease: Power1.easeIn,
      });
    }

    const cameraMoveSpeed = removeSpeed * 2 + oldBlocks.length * delayAmount;
    this.stage.setCamera(2, cameraMoveSpeed);

    const countdown = { value: this.blocks.length - 1 };
    TweenLite.to(countdown, cameraMoveSpeed, {
      value: 0,
      onUpdate: () => {
        if (this.scoreContainer) {
          this.scoreContainer.innerHTML = String(Math.round(countdown.value));
        }
      },
    });

    this.blocks = this.blocks.slice(0, 1);

    setTimeout(() => {
      this.startGame();
    }, cameraMoveSpeed * 1000);
  }

  private placeBlock() {
    const currentBlock = this.blocks[this.blocks.length - 1];
    const newBlocks = currentBlock.place();
    this.newBlocks.remove(currentBlock.mesh);

    if (newBlocks.placed) this.placedBlocks.add(newBlocks.placed);

    if (newBlocks.chopped) {
      this.choppedBlocks.add(newBlocks.chopped);

      const positionParams: GSAPParams = {
        y: "-=30",
        ease: Power1.easeIn,
        onComplete: () => {
          this.choppedBlocks.remove(newBlocks.chopped!);
        },
      };

      const rotationParams = {
        delay: 0.05,
        x: newBlocks.plane === "z" ? Math.random() * 10 - 5 : 0.1,
        z: newBlocks.plane === "x" ? Math.random() * 10 - 5 : 0.1,
        y: Math.random() * 0.1,
      };

      positionParams[newBlocks.plane] =
        (newBlocks.chopped.position[newBlocks.plane] >
        newBlocks.placed!.position[newBlocks.plane]
          ? "+="
          : "-=") +
        40 * Math.abs(newBlocks.direction);

      TweenLite.to(newBlocks.chopped.position, 1, positionParams);
      TweenLite.to(newBlocks.chopped.rotation, 1, rotationParams);
    }

    this.addBlock();
  }

  private addBlock() {
    const lastBlock = this.blocks[this.blocks.length - 1];
    if (lastBlock && lastBlock.state === "missed") {
      return this.endGame();
    }

    if (this.scoreContainer) {
      this.scoreContainer.innerHTML = String(this.blocks.length - 1);
    }
    const newBlock = new Block(lastBlock);
    this.newBlocks.add(newBlock.mesh);
    this.blocks.push(newBlock);
    this.stage.setCamera(this.blocks.length * 2);

    if (this.blocks.length >= 5 && this.instructions) {
      this.instructions.classList.add("hide");
    }
  }

  private endGame() {
    this.updateState(this.STATES.ENDED);
    // Use the score from the DOM which represents the actual blocks successfully placed
    const finalScore = parseInt(this.scoreContainer?.innerHTML || "0");
    if (this.onGameEnd) {
      this.onGameEnd(finalScore);
    }
  }

  private tick() {
    if (this.animationId !== null) {
      this.blocks[this.blocks.length - 1].tick();
      this.stage.render();
      this.animationId = requestAnimationFrame(() => this.tick());
    }
  }

  public setInputDisabled(disabled: boolean) {
    this.inputDisabled = disabled;
  }

  public destroy() {
    // Cancel animation frame
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // Remove event listeners
    document.removeEventListener("keydown", this.keydownHandler);
    document.removeEventListener("click", this.clickHandler);
    document.removeEventListener("touchstart", this.touchstartHandler);

    // Clear the game container
    const gameContainer = document.getElementById("game");
    if (gameContainer) {
      gameContainer.innerHTML = "";
    }

    // Reset score and state
    if (this.scoreContainer) {
      this.scoreContainer.innerHTML = "0";
    }
    if (this.mainContainer) {
      this.mainContainer.className = "text-white";
    }

    // Dispose of Three.js resources
    this.stage.dispose();
  }
}
