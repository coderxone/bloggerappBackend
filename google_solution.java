class RLEIterator {
    int[] LocalInputData;
    int i;
    int M;

    public RLEIterator(int[] inputData) {
        this.LocalInputData = inputData;
        i = 0;
        M = 0;
    }

    public int next(int n) {
        while (i < LocalInputData.length) {
            if (M + n > LocalInputData[i]) {
                n -= LocalInputData[i] - M;
                M = 0;
                i += 2;
            } else {
                M += n;
                return LocalInputData[i + 1];
            }
        }

        return -1;
    }

}
