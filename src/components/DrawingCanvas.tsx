import React, { useRef, useEffect } from 'react';
import { View, PanResponder, StyleSheet, Dimensions } from 'react-native';
import { Canvas, Path, Skia } from '@react-native-skia/skia';

export interface DrawPoint {
  x: number;
  y: number;
}

interface CanvasProps {
  width: number;
  height: number;
  backgroundColor?: string;
  penColor: string;
  penWidth: number;
  onDraw?: (points: DrawPoint[]) => void;
  isDrawing: boolean;
}

export const DrawingCanvas: React.FC<CanvasProps> = ({
  width,
  height,
  backgroundColor = '#ffffff',
  penColor,
  penWidth,
  onDraw,
  isDrawing,
}) => {
  const canvasRef = useRef(null);
  const [paths, setPaths] = React.useState<string[]>([]);
  const [currentPath, setCurrentPath] = React.useState('');
  const pointsRef = useRef<DrawPoint[]>([]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => isDrawing,
    onMoveShouldSetPanResponder: () => isDrawing,
    onPanResponderGrant: (evt) => {
      if (!isDrawing) return;
      const { locationX, locationY } = evt.nativeEvent;
      pointsRef.current = [{ x: locationX, y: locationY }];
      const newPath = `M ${locationX} ${locationY}`;
      setCurrentPath(newPath);
    },
    onPanResponderMove: (evt) => {
      if (!isDrawing || !currentPath) return;
      const { locationX, locationY } = evt.nativeEvent;
      pointsRef.current.push({ x: locationX, y: locationY });
      setCurrentPath((prev) => `${prev} L ${locationX} ${locationY}`);
    },
    onPanResponderRelease: () => {
      if (currentPath) {
        setPaths((prev) => [...prev, currentPath]);
        if (onDraw) onDraw(pointsRef.current);
        setCurrentPath('');
        pointsRef.current = [];
      }
    },
  });

  return (
    <View
      style={[styles.container, { width, height }]}
      {...panResponder.panHandlers}
    >
      <Canvas
        ref={canvasRef}
        style={{ width, height }}
      >
        <View
          style={{
            width,
            height,
            backgroundColor,
          }}
        />
        {paths.map((pathData, idx) => (
          <Path
            key={idx}
            path={pathData}
            color={penColor}
            strokeWidth={penWidth}
            style="stroke"
            strokeLineCap="round"
            strokeLineJoin="round"
          />
        ))}
        {currentPath && (
          <Path
            path={currentPath}
            color={penColor}
            strokeWidth={penWidth}
            style="stroke"
            strokeLineCap="round"
            strokeLineJoin="round"
          />
        )}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
