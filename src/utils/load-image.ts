import { waitForEventTarget } from '@blackglory/wait-for'

export async function loadImage(url: string): Promise<HTMLImageElement> {
  const image = new Image()
  image.src = url
  await waitForEventTarget(image, 'load')
  return image
}
