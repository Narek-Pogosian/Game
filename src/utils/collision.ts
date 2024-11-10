interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function checkBoxCollision<T extends Box, V extends Box>(
  box1: T,
  box2: V
) {
  if (
    box1.x + box1.width >= box2.x &&
    box1.x <= box2.x + box2.width &&
    box1.y + box1.height >= box2.y &&
    box1.y <= box2.y + box2.height
  ) {
    return true;
  }

  return false;
}
