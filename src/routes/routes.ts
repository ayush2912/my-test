import { Router, Request, Response } from "express";

export const index = (req: Request, res: Response) => res.send(
  '<div class="tenor-gif-embed" data-postid="23513555" data-share-method="host" data-aspect-ratio="1.77778" data-width="100%"><a href="https://tenor.com/view/sheldon-cooper-bazinga-tbbt-gif-23513555">Sheldon Cooper GIF</a>from <a href="https://tenor.com/search/sheldon-gifs">Sheldon GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>'
);

export default function routes (router: Router) {
  router.get("/", index);
}