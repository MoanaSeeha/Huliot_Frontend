import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const HighTrapIcon2 = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="8" stroke={fill} strokeWidth="2" />
      <path d="M14 14L26 26M14 26L26 14" stroke={fill} strokeWidth="2" />
      <path
        d="M6.2293 5.06527C6.08034 5.06527 5.94662 5.06362 5.82813 5.06033C5.70963 5.05704 5.59453 5.04881 5.48282 5.03564C5.37448 5.02248 5.26446 5.00273 5.15274 4.9764C5.04102 4.94678 4.91914 4.90728 4.78711 4.85791C4.83112 4.73942 4.87344 4.62093 4.91406 4.50244C4.95807 4.38395 5.00208 4.26217 5.0461 4.1371C5.18828 4.17989 5.31354 4.2128 5.42187 4.23584C5.53021 4.25888 5.63516 4.27698 5.73672 4.29015C5.84166 4.30002 5.95 4.3066 6.06172 4.3099C6.17682 4.31319 6.31054 4.31483 6.46289 4.31483H9.1543C9.18138 4.40699 9.2017 4.48763 9.21523 4.55675C9.23216 4.62587 9.2457 4.6884 9.25586 4.74436C9.27278 4.84968 9.28463 4.9583 9.29141 5.07021C9.29818 5.17882 9.30156 5.29237 9.30156 5.41086V6.10698C9.30156 6.27484 9.29479 6.43283 9.28125 6.58095C9.26771 6.72906 9.24062 6.87223 9.2 7.01047C9.16276 7.14871 9.10859 7.28365 9.0375 7.41531C8.96641 7.54696 8.87162 7.68027 8.75313 7.81521C8.50599 8.09498 8.26224 8.36322 8.02187 8.61995C7.7849 8.87339 7.54453 9.12847 7.30078 9.3852L6.63047 8.79275L7.19414 8.21511C7.34649 8.05713 7.49544 7.90079 7.64102 7.7461C7.78998 7.58811 7.9237 7.43999 8.04218 7.30176C8.13698 7.19314 8.20977 7.08618 8.26054 6.98085C8.31133 6.87223 8.34857 6.76197 8.37226 6.65007C8.39596 6.53486 8.4095 6.41309 8.41289 6.28472C8.41966 6.15636 8.42305 6.01483 8.42305 5.86013C8.42305 5.72848 8.42135 5.59682 8.41797 5.46517C8.41458 5.33352 8.4095 5.20021 8.40274 5.06527H6.2293ZM4.91914 7.59305C4.91914 7.45151 4.91914 7.32315 4.91914 7.20795C4.92253 7.09276 4.92761 6.9825 4.93438 6.87717C4.94453 6.76855 4.95807 6.66323 4.975 6.5612C4.99193 6.45587 5.01394 6.34561 5.04102 6.23042C5.18659 6.25017 5.33047 6.27155 5.47266 6.2946C5.61823 6.31435 5.7638 6.3341 5.90938 6.35384C5.88906 6.47233 5.87044 6.5793 5.85351 6.67475C5.83998 6.76691 5.82813 6.86071 5.81797 6.95616C5.8112 7.04832 5.80612 7.14706 5.80274 7.25239C5.79935 7.35442 5.79766 7.47456 5.79766 7.61279V10.9996H4.91914V7.59305ZM10.4035 9.48888C10.4577 9.16303 10.5051 8.87997 10.5457 8.6397C10.5897 8.39614 10.6286 8.18056 10.6625 7.99295C10.6964 7.80534 10.7251 7.63748 10.7488 7.48937C10.7759 7.33797 10.8013 7.19149 10.825 7.04997C10.8521 6.90515 10.8775 6.75704 10.9012 6.60563C10.9249 6.45423 10.952 6.28307 10.9824 6.09218C10.9994 5.92761 11.001 5.78937 10.9875 5.67746C10.9773 5.56227 10.9486 5.452 10.9012 5.34668C10.8572 5.23807 10.7945 5.12451 10.7133 5.00602C10.632 4.88424 10.5322 4.73284 10.4137 4.55181C10.4814 4.51232 10.5423 4.47611 10.5965 4.4432C10.6506 4.41028 10.7065 4.37737 10.7641 4.34446C10.8216 4.31154 10.8826 4.27698 10.9469 4.24078C11.0146 4.20128 11.0958 4.1552 11.1906 4.10254C11.2685 4.20786 11.3345 4.30002 11.3887 4.37901C11.4462 4.45801 11.497 4.53206 11.541 4.60118C11.585 4.66701 11.624 4.73284 11.6578 4.79867C11.6917 4.86449 11.7255 4.93361 11.7594 5.00602C11.9016 4.87766 12.037 4.76411 12.1656 4.66536C12.2977 4.56333 12.4314 4.4794 12.5668 4.41357C12.7022 4.34446 12.8461 4.29179 12.9984 4.25559C13.1508 4.21938 13.3183 4.20128 13.5012 4.20128C13.9481 4.20128 14.3205 4.31483 14.6183 4.54194C14.9162 4.76575 15.1143 5.11134 15.2125 5.57873C15.2396 5.71038 15.2582 5.87494 15.2683 6.07243C15.2819 6.26662 15.2904 6.46904 15.2938 6.67969C15.3006 6.88704 15.3022 7.09111 15.2988 7.29188C15.2988 7.48937 15.2988 7.65887 15.2988 7.8004C15.2954 8.0275 15.2904 8.24474 15.2836 8.45209C15.2768 8.65945 15.2683 8.83225 15.2582 8.97048C15.2514 9.04289 15.2446 9.11859 15.2379 9.19759C15.2311 9.27658 15.221 9.35887 15.2074 9.44444H12.7039V8.69401H14.405C14.4085 8.63806 14.4118 8.57717 14.4152 8.51134C14.422 8.44551 14.4254 8.35829 14.4254 8.24968C14.4288 8.13777 14.4305 7.99459 14.4305 7.82015C14.4338 7.64242 14.4355 7.41531 14.4355 7.13883C14.4355 7.01376 14.4338 6.88704 14.4305 6.75868C14.4271 6.62702 14.422 6.50196 14.4152 6.38346C14.4085 6.26168 14.3983 6.14813 14.3848 6.0428C14.3746 5.93748 14.361 5.84697 14.3442 5.77126C14.3137 5.64949 14.2747 5.53922 14.2274 5.44048C14.1799 5.33845 14.119 5.25288 14.0446 5.18375C13.9701 5.11464 13.882 5.06198 13.7805 5.02577C13.6789 4.98628 13.5587 4.96653 13.4199 4.96653C13.271 4.96653 13.1271 4.98957 12.9883 5.03564C12.8529 5.08173 12.7226 5.14426 12.5973 5.22325C12.472 5.29895 12.3518 5.38782 12.2367 5.48986C12.1216 5.59189 12.0116 5.69721 11.9066 5.80583C11.8457 6.17117 11.7915 6.49373 11.7441 6.77349C11.7001 7.05326 11.6595 7.30505 11.6223 7.52886C11.585 7.74939 11.5512 7.94686 11.5207 8.12131C11.4936 8.29246 11.4665 8.45374 11.4395 8.60514C11.4124 8.75655 11.387 8.90301 11.3633 9.04454C11.3396 9.18607 11.3142 9.33419 11.2871 9.48888H10.4035Z"
        fill={fill}
      />
    </svg>
  )
}