# react2025
https://github.com/rolling-scopes-school/tasks/tree/master/react

## React Dev Tools Profiler to measure the performance  of the application
Initial profiling was performed using React DevTools Profiler.

Tested interactions:
Sorting a column
Searching another country
Selecting another year
Adding/removing columns

### Initial Profiling with React Dev Tools Profiler

#### Steps:
1. Commit Duration: Time taken for React to render the committed updates.
2. Render Duration: Time taken for individual components to render.
3. Interactions: User interactions that triggered the renders.
4. Flame Graph: Visual representation of component render times.
5. Ranked Chart: Sorted list of components by render duration.

## 1. Commit Duration:
Before & After Optimization
| Before Optimization | After Optimization | Improvement (%) |
| ------------------- | ------------------ | --------------- |
|       32.8ms        |                    |                 |

- Flame Graph
  ![alt text](public/pic1.png)

## 2. Render Duration:
|                     |  Render Duration before  | Render Duration after |
| ------------------- | ------------------ | --------------- |
|        Provider     |       2.8ms        |                 |
|ReactRedux.Provider  |       0.1ms        |                 |
|    ErrorBoundary    |       0.8ms        |                 |
|        App          |       1ms          |                 |
|    SearchForm       |       15.5ms       |                 |
|        DataTable    |       112.4ms      |                 |
 

## 3. Interactions

| Interaction Type       | Component       | Before Optimization | After Optimization | Improvement (%) |
| ---------------------- | --------------- | ------------------- | ------------------ | --------------- |
| Sort by Name           | DataTable       |   130.7ms           | 4                  |                 |
| Sort by Population     | DataTable       |   166.1ms           | 4                  |                 |
| Another country        | DataTable       |   166.1ms           | 4                  |                 |
| Another year           | DataTable       |   166.1ms           | 4                  |                 |
| Adding/removing columns| DataTable       |   166.1ms           | 4                  |                 |

## Flame Graph
  ![alt text](public/pic2.png)

  ![alt text](public/pic3.png)

## Ranked Chart



## Conclusion

After optimization (with React.memo, useMemo, useCallback) resulted in major improvements in render efficiency.
`React.memo` prevented unnecessary re-renders,
`useMemo` optimized expensive computations,
`useCallback` memoized functions to prevent redundant re-creations. 

