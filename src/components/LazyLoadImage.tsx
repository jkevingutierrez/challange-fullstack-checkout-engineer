import React, { FunctionComponent, DetailedHTMLProps, ImgHTMLAttributes, useRef, useEffect } from 'react';


interface ILazyLoadImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  loading: string;
}

const LazyLoadImage: FunctionComponent<ILazyLoadImageProps> = props => {
  const element = useRef({} as any);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.current.src = element?.current?.dataset?.src;
          observer.disconnect();
        }
      });
    });

    observer.observe(element.current as Element);
  }, [props]);

  const { src, alt, ...rest } = props

  return <img {...rest} data-src={src} alt={alt} ref={element} />;
};

export default LazyLoadImage;
