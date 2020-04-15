---
title: "MySQL 간단정리"
date: "2020-04-15"
draft: false
author: ghleokim
tags:
  - SQL
  - MySQL
  - Database
---

MySQL 공부하면서 간단하게 내용 정리중입니다.

## 기본 내용

### 기본 구문 basic select : `SELECT`

```SQL
SELECT column_name
FROM table_name;
```

### 조건절 붙이기 search upon condition : `WHERE`

```SQL
SELECT column_name
FROM table_name
WHERE condition;
```

### 순서 만들기 ascending/descending order, max, min : `ORDER BY`, `ASC|DESC`

```SQL
SELECT column_name
FROM table_name
ORDER BY column_name ASC|DESC;
```

### count row : `COUNT()`

```SQL
SELECT COUNT(column_name) # as `count` if labeling column
FROM table_name;
```

### count row 중복제거 : `COUNT(DISTINCT column_name)`

```SQL
SELECT COUNT(DISTINCT column_name)
FROM table_name;
```

### select top n : `LIMIT`

```SQL
SELECT column_name
FROM table_name
WHERE condition
LIMIT number;
```

### 칼럼을 기준으로 모아보기: `GROUP BY`

```SQL
SELECT column_name as c
FROM table_name
GROUP BY NAME
```
​
### `GROUP BY` with `HAVING()`

```SQL
-- example : use count as criteria for output
SELECT column_name as c
FROM table_name
GROUP BY NAME
HAVING c>1
```

### 변수 사용하기 : `SET @var_name`

```SQL
SET @x=1; -- Define Variable
```

### 변수 사용 중 조작하기

```SQL
SET @x=-1;
SELECT @x:= @x+1; -- output : 0
```

### handling NULL : `IFNULL()`  or  `COALESCE()`

---

## String

### 패턴매칭 - 와일드카드 사용하여 검색 : `LIKE` OR `REGEXP`

```SQL
SELECT column_name
FROM table_name
WHERE column_name LIKE '20__' # OR '%EL', '%EL%' etc.
```

### 패턴매칭 - 대소문자 구분하기 : `LIKE BINARY`

```SQL
SELECT column_name
FROM table_name
WHERE column_name LIKE BINARY 'El%' # case sensitive\
```

### 문자 나눠서 사용하기 : `SUBSTRING_INDEX`

```SQL
-- SUBSTRING_INDEX(column, 구분자, count)
SELECT SUBSTRING_INDEX(column_name, ' ', 
```

---

## JOIN 살펴보기

### `JOIN`

기본적으로 JOIN은 교집합이라고 생각하면 쉽다. 어느 한 쪽에만 있는 데이터는 모두 무시된다.

```SQL
SELECT t1|t2.column_name
FROM table_name1 as t1
JOIN table_name2 as t2
ON t1.id = t2.id
```

### `LEFT JOIN`, `RIGHT JOIN`

어느 테이블을 기준으로 합칠 건지에 따라 결과가 달라진다. 이는 아무것도 적지 않은 `JOIN`과는 다르게 OUTER JOIN이다. 교집합 이외의 기준 테이블의 내용을 가져간다.

```SQL
기준 테이블 LEFT JOIN 기준에 따라가는 테이블 ON condition
```
```SQL 
기준에 따라가는 테이블 RIGHT JOIN 기준 테이블 ON condition
```

이 때 **기준 테이블**에는 있지만 **기준에 따라가는 테이블**에는 없다면 해당 레코드에는 NULL값이, 반대의 경우라면 무시된다.

---

## Miscellanous

### `--` 과 `#`

`--` 의 경우 SQL 표준 주석 문법이고, MySQL에서는 `#` 도 사용 가능하다. 

### `WHERE` 와 `HAVING` 의 차이

WHERE와 HAVING의 가장 큰 차이는 GROUP BY와 함께 사용되었을 때 나타난다. WHERE문은 GROUP BY **이전**에 레코드를 거르는 역할을 하고, HAVING은 GROUP BY **이후**에 레코드를 거르는 역할을 한다.

### 와일드카드 : `%` , `_`

기본적으로 패턴매칭시 case insensitive(대소문자 구별x)이다.

`%` 의 경우 0개 이상의 글자를 대체

`LIKE '%ER'` : HER, STRONGER, ER, ...

`_` 의 경우 1개의 글자만을 대체

`LIKE '_ER'` : HER, MER, TER, ... (ER의 경우 해당하지 않음)

대소문자 구분시 `LIKE BINARY` 를 사용할 수 있다.