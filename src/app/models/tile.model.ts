export class Tile {
  
  private x: number;
  private y: number;
  private className: string;
  private walkable: boolean;

  constructor(props) {
    this.x = props['x'] || 0;
    this.y = props['y'] || 0;
    this.className = props['className'] || null;
    this.walkable = props['walkable'] || false;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getClassName(): string {
    return this.className;
  }

  isWalkable(): boolean {
    return this.walkable;
  }

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number):void {
    this.y = y;
  }

  setClassName(name: string): void {
    this.className = name;
  }

}