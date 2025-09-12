export function generateBingoCard(): string[][] {
  // Create empty 5x5 card
  const card: string[][] = Array(5)
    .fill(null)
    .map(() => Array(5).fill(""))

  // Generate columns with appropriate number ranges
  // B: 1-15, I: 16-30, N: 31-45, G: 46-60, O: 61-75
  for (let col = 0; col < 5; col++) {
    const min = col * 15 + 1
    const max = min + 14
    const letter = "BINGO"[col]

    // Generate unique numbers for this column
    const usedNumbers = new Set<number>()
    for (let row = 0; row < 5; row++) {
      // Skip the center free space
      if (col === 2 && row === 2) {
        card[row][col] = "FREE"
        continue
      }

      let num: number
      do {
        num = Math.floor(Math.random() * (max - min + 1)) + min
      } while (usedNumbers.has(num))

      usedNumbers.add(num)
      card[row][col] = `${letter}${num}`
    }
  }

  return card
}
