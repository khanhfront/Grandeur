const getUnavailableRanges = (
  availableRanges: AvailableRange[],
  startLimit: Date,
  endLimit: Date
): UnavailableRange[] => {
  let unavailableRanges: UnavailableRange[] = [];
  let previousEnd = startLimit;

  availableRanges.forEach((range) => {
    // Nếu khoảng bắt đầu của availableRange sau previousEnd thì đó là khoảng không khả dụng
    if (range.from > previousEnd) {
      unavailableRanges.push({
        from: previousEnd,
        to: new Date(range.from.getTime() - 86400000), // Trừ đi 1 ngày
      });
    }
    // Cập nhật previousEnd là ngày kết thúc của khoảng khả dụng hiện tại
    previousEnd = new Date(range.to.getTime() + 86400000); // Cộng thêm 1 ngày
  });

  // Nếu previousEnd vẫn nhỏ hơn endLimit thì từ previousEnd đến endLimit là không khả dụng
  if (previousEnd < endLimit) {
    unavailableRanges.push({
      from: previousEnd,
      to: endLimit,
    });
  }

  return unavailableRanges;
};
