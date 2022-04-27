import { useMemo } from "react";
import NextNProgress from "nextjs-progressbar";

import { CommentsProvider, CommentsStore } from "../stores/commentsStore";
import { LikesProvider, LikesStore } from "../stores/likesStore";

import "./../styles/main.css";

function MyApp({ Component, pageProps }) {
  const commentsStore = useMemo(() => new CommentsStore(), []);
  const likesStore = useMemo(() => new LikesStore(), []);

  return (
    <LikesProvider store={likesStore}>
        <CommentsProvider store={commentsStore}>
          <Component {...pageProps} />
          <NextNProgress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
        </CommentsProvider>
    </LikesProvider>
  );
}

export default MyApp;
