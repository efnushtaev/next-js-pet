import { observer } from "mobx-react-lite";
import { FC } from "react";

import styles from "./styles.module.css";

type SocialControllsType = {
  isLiked: boolean
  justify: "center" | "left" | "right";
  commentsCount: number;
  callback: (e: any) => void
};

const justifyClasses = {
  center: styles.justifyCenter,
  left: styles.justifyLeft,
  right: styles.justifyRight,
};

export const SocialControlls: FC<SocialControllsType> = observer(
  ({ justify, commentsCount, isLiked, callback }) => {
    return (
      <div className={`${styles.wrapper} ${justifyClasses[justify]}`}>
        <div className={styles.controlls}>
          <svg
            onClick={callback}
            width="20"
            height="20"
            viewBox="0 0 30 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.8182 0C18.9545 0 16.4318 1.4 15 3.6C13.5682 1.4 11.0455 0 8.18182 0C3.68182 0 0 3.6 0 8C0 15.9333 15 24 15 24C15 24 30 16 30 8C30 3.6 26.3182 0 21.8182 0Z"
              fill={isLiked ? "red" : "#c4c4c4"}
            />
          </svg>
        </div>
        <div className={styles.controlls}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 11.6643C28 13.7785 27.375 15.7317 26.125 17.5238C24.875 19.316 23.1771 20.7315 21.0312 21.7704C18.8854 22.8092 16.5417 23.3287 14 23.3287C13.2708 23.3287 12.5156 23.2801 11.7344 23.1829C9.67188 25.3092 7.27604 26.7794 4.54688 27.5934C4.03646 27.7635 3.44271 27.8972 2.76562 27.9944C2.58854 28.0187 2.42969 27.964 2.28906 27.8304C2.14844 27.6967 2.05729 27.5205 2.01562 27.3018V27.2836C1.98438 27.235 1.98177 27.1621 2.00781 27.0649C2.03385 26.9677 2.04427 26.9069 2.03906 26.8826C2.03385 26.8583 2.05729 26.8006 2.10938 26.7095L2.20312 26.5455L2.3125 26.3905L2.4375 26.2265C2.51042 26.1293 2.67188 25.9197 2.92188 25.5977C3.17188 25.2758 3.35156 25.0449 3.46094 24.9052C3.57031 24.7654 3.73177 24.5255 3.94531 24.1853C4.15885 23.845 4.32812 23.5352 4.45312 23.2558C4.57812 22.9763 4.71875 22.6179 4.875 22.1805C5.03125 21.743 5.16667 21.2813 5.28125 20.7953C3.64583 19.7139 2.35677 18.3774 1.41406 16.7857C0.471354 15.194 0 13.4869 0 11.6643C0 10.0848 0.369792 8.5751 1.10938 7.13529C1.84896 5.69547 2.84375 4.4531 4.09375 3.40817C5.34375 2.36324 6.83333 1.53398 8.5625 0.920389C10.2917 0.306796 12.1042 0 14 0C16.5417 0 18.8854 0.519427 21.0312 1.55828C23.1771 2.59714 24.875 4.01265 26.125 5.80483C27.375 7.597 28 9.55017 28 11.6643Z"
              fill="#c4c4c4"
            />
          </svg>
          <span>{commentsCount}</span>
        </div>
      </div>
    );
  }
);
