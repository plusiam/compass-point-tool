import { useEffect, useRef } from 'react';

/**
 * 자동 저장 Hook
 * @param data 저장할 데이터
 * @param key localStorage 키
 * @param delay 저장 지연 시간 (ms)
 */
export const useAutoSave = <T,>(
  data: T,
  key: string,
  delay: number = 2000
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const initialRenderRef = useRef(true);

  useEffect(() => {
    // 첫 렌더링 시에는 저장하지 않음
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    // 이전 타이머 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 새 타이머 설정
    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
        console.log('Auto-saved:', new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, delay);

    // 클린업
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, key, delay]);
};
