import * as PIXI from "pixi.js";
import gsap from "gsap";
import { Directive, DirectiveOptions } from "./Directive";
import { TweenVars } from "./type";

export interface AnimationDirectiveOptions extends DirectiveOptions {
  targetName: string;
  fromVars?: TweenVars;
  toVars?: TweenVars;
}

export abstract class AnimationDirective<
  T extends PIXI.DisplayObject = PIXI.DisplayObject,
> extends Directive {
  protected target: T;
  protected declare options: AnimationDirectiveOptions;

  constructor(options: AnimationDirectiveOptions, stage: PIXI.Container) {
    super(options, stage);
    this.options = options;
    this.target = this.stage.getChildByName(options.targetName, true)!;
  }

  public execute(): void {
    if (!this.target) {
      return;
    }

    const { fromVars, toVars } = this.options;

    // 理论上所有动画指令都需要显示目标
    this.target.visible = true;

    if (fromVars && toVars) {
      gsap.fromTo(this.target, fromVars, toVars);
    } else if (toVars) {
      gsap.to(this.target, toVars);
    }
  }

  public getDuration(): number {
    // 动画指令默认不占视频时长，即同时执行
    return this.options.sequential ? this.options.toVars?.duration ?? 0 : 0;
  }
}
