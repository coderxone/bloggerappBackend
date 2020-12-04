Approach 1: Store Exhausted Position and Quantity
Intuition

We can store an index i and quantity q which represents that q elements of A[i] (repeated A[i+1] times) are exhausted.

For example, if we have A = [1,2,3,4] (mapping to the sequence [2,4,4,4]) then i = 0, q = 0 represents that nothing is exhausted; i = 0, q = 1 represents that [2] is exhausted, i = 2, q = 1 will represent that we have currently exhausted [2, 4], and so on.

Algorithm

Say we want to exhaust n more elements. There are currently D = A[i] - q elements left to exhaust (of value A[i+1]).

If n > D, then we should exhaust all of them and continue: n -= D; i += 2; q = 0.

Otherwise, we should exhaust some of them and return the current element's value: q += D; return A[i+1].


Подход 1: сохраните исчерпанное положение и количество
Интуиция

Мы можем сохранить индекс i и количество q, которые представляют, что q элементов A [i] (повторенных A [i + 1] раз) исчерпаны.

Например, если у нас есть A = [1,2,3,4] (отображение на последовательность [2,4,4,4]), то i = 0, q = 0 означает, что ничего не исчерпано; i = 0, q = 1 означает, что [2] исчерпан, i = 2, q = 1 будет означать, что мы в настоящее время исчерпали [2, 4] и так далее.

Алгоритм

Допустим, мы хотим исчерпать еще n элементов. В настоящее время осталось исчерпать D = A [i] - q элементов (со значением A [i + 1]).

Если n> D, то надо их все исчерпать и продолжить: n - = D; я + = 2; д = 0.

В противном случае мы должны исчерпать некоторые из них и вернуть текущее значение элемента: q + = D; вернуть A [i + 1].
