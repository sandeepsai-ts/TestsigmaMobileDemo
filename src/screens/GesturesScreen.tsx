import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppState } from '../AppState';
import TestBanner from '../components/TestBanner';
import { fontSize, radius, spacing } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_WIDTH = SCREEN_WIDTH - spacing.md * 2;
const CAROUSEL_PAGES = ['Page 1', 'Page 2', 'Page 3'];

function SwipeCarousel() {
  const { colors } = useAppState();
  const [page, setPage] = useState(0);
  return (
    <View style={styles.block}>
      <Text style={[styles.blockTitle, { color: colors.ink }]}>Swipe</Text>
      <ScrollView
        testID="swipeCarousel"
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width: CAROUSEL_WIDTH }}
        onMomentumScrollEnd={e => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / CAROUSEL_WIDTH);
          setPage(idx);
        }}>
        {CAROUSEL_PAGES.map((label, idx) => (
          <View
            key={label}
            style={[
              styles.carouselPage,
              { width: CAROUSEL_WIDTH, backgroundColor: idx % 2 === 0 ? colors.accent : colors.success },
            ]}>
            <Text style={styles.carouselPageText}>{label}</Text>
          </View>
        ))}
      </ScrollView>
      <Text testID="carouselPageIndicatorText" style={[styles.caption, { color: colors.muted }]}>
        Page {page + 1} of {CAROUSEL_PAGES.length}
      </Text>
    </View>
  );
}

function LongPressCard() {
  const { colors } = useAppState();
  const [revealed, setRevealed] = useState(false);
  return (
    <View style={styles.block}>
      <Text style={[styles.blockTitle, { color: colors.ink }]}>Long Press</Text>
      <TouchableOpacity
        testID="longPressCard"
        style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
        onLongPress={() => setRevealed(v => !v)}
        delayLongPress={500}>
        <Text testID="longPressResultText" style={{ color: colors.ink, fontWeight: '600' }}>
          {revealed ? 'Hidden content revealed!' : 'Hold this card for 500ms\u2026'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function PinchZoomImage() {
  const { colors } = useAppState();
  const scale = useRef(new Animated.Value(1)).current;
  const baseDistance = useRef<number | null>(null);
  const baseScale = useRef(1);
  const [scaleLabel, setScaleLabel] = useState('1.00x');

  const distance = (touches: { pageX: number; pageY: number }[]) => {
    const [a, b] = touches;
    return Math.hypot(a.pageX - b.pageX, a.pageY - b.pageY);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_evt, gesture) => gesture.numberActiveTouches === 2,
      onPanResponderMove: evt => {
        const touches = evt.nativeEvent.touches;
        if (touches.length === 2) {
          const d = distance(touches as any);
          if (baseDistance.current === null) {
            baseDistance.current = d;
          }
          const nextScale = Math.min(3, Math.max(0.5, baseScale.current * (d / baseDistance.current)));
          scale.setValue(nextScale);
          setScaleLabel(`${nextScale.toFixed(2)}x`);
        }
      },
      onPanResponderRelease: () => {
        baseDistance.current = null;
        // @ts-ignore - private RN API is fine for a static Animated.Value read
        baseScale.current = scale.__getValue ? scale.__getValue() : baseScale.current;
      },
    }),
  ).current;

  return (
    <View style={styles.block}>
      <Text style={[styles.blockTitle, { color: colors.ink }]}>Pinch to Zoom</Text>
      <View
        testID="pinchZoomImage"
        style={[styles.pinchArea, { backgroundColor: colors.card, borderColor: colors.border }]}
        {...panResponder.panHandlers}>
        <Animated.View style={[styles.pinchTarget, { backgroundColor: colors.accent, transform: [{ scale }] }]} />
      </View>
      <Text testID="pinchScaleValueText" style={[styles.caption, { color: colors.muted }]}>
        Scale: {scaleLabel} (use two fingers on a real device)
      </Text>
    </View>
  );
}

const REORDER_ROW_HEIGHT = 44;

function DragReorderList() {
  const { colors } = useAppState();
  const [items, setItems] = useState(['Item A', 'Item B', 'Item C', 'Item D']);

  return (
    <View style={styles.block}>
      <Text style={[styles.blockTitle, { color: colors.ink }]}>Drag to Reorder</Text>
      <View testID="dragReorderList" style={styles.reorderList}>
        {items.map((label, index) => (
          <ReorderRow
            key={label}
            label={label}
            index={index}
            total={items.length}
            onMove={(from, to) => {
              setItems(prev => {
                const next = [...prev];
                const [moved] = next.splice(from, 1);
                next.splice(to, 0, moved);
                return next;
              });
            }}
          />
        ))}
      </View>
    </View>
  );
}

function ReorderRow({
  label,
  index,
  total,
  onMove,
}: {
  label: string;
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
}) {
  const { colors } = useAppState();
  const y = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: y }], { useNativeDriver: false }),
      onPanResponderRelease: (_evt, gesture) => {
        const rows = Math.round(gesture.dy / REORDER_ROW_HEIGHT);
        const targetIndex = Math.min(total - 1, Math.max(0, index + rows));
        Animated.spring(y, { toValue: 0, useNativeDriver: false }).start();
        if (targetIndex !== index) {
          onMove(index, targetIndex);
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      testID={`reorderRow-${index}`}
      style={[
        styles.reorderRow,
        { backgroundColor: colors.card, borderColor: colors.border, transform: [{ translateY: y }] },
      ]}>
      <Text style={{ color: colors.ink, fontWeight: '600' }}>{label}</Text>
      <View testID={`reorderHandle-${index}`} {...panResponder.panHandlers} style={styles.reorderHandle}>
        <Text style={{ color: colors.muted, fontSize: 18 }}>{'\u2261'}</Text>
      </View>
    </Animated.View>
  );
}

export default function GesturesScreen() {
  const { colors } = useAppState();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshedAt, setRefreshedAt] = useState<string | null>(null);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefreshedAt(new Date().toLocaleTimeString());
    }, 900);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <TestBanner />
      <ScrollView
        testID="gesturesScrollView"
        refreshControl={
          <RefreshControl testID="pullToRefreshControl" refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.content}>
        <Text testID="pageTitleLabel" style={[styles.title, { color: colors.ink }]}>
          Gestures
        </Text>
        <Text testID="lastRefreshedText" style={[styles.caption, { color: colors.muted, marginBottom: spacing.md }]}>
          {refreshedAt ? `Last pulled to refresh at ${refreshedAt}` : 'Pull down to refresh this screen'}
        </Text>
        <SwipeCarousel />
        <LongPressCard />
        <PinchZoomImage />
        <DragReorderList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  title: { fontSize: fontSize.xl, fontWeight: '800', marginBottom: 4 },
  caption: { fontSize: fontSize.xs },
  block: { marginBottom: spacing.lg },
  blockTitle: { fontSize: fontSize.md, fontWeight: '700', marginBottom: spacing.sm },
  carouselPage: { height: 100, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  carouselPageText: { color: '#fff', fontWeight: '800', fontSize: fontSize.lg },
  card: { borderWidth: 1, borderRadius: radius.md, padding: spacing.md },
  pinchArea: {
    height: 140,
    borderWidth: 1,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pinchTarget: { width: 60, height: 60, borderRadius: radius.sm },
  reorderList: {},
  reorderRow: {
    height: REORDER_ROW_HEIGHT,
    borderWidth: 1,
    borderRadius: radius.sm,
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reorderHandle: { padding: spacing.xs },
});
