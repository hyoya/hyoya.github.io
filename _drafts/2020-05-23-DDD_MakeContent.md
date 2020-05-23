# 사이드바에 그거 추가



### 그걸 정리해놓은것이다



### 일단 [이걸](https://blog.webjeda.com/jekyll-toc/) 따라해보기로했다.

- 나는 따로 ```js```폴더같은게 없어서 그냥 바로 ```/```에 toc.js를 넣고, 호출할때 ```/toc.js``` 로 했다. 잘 된다
- 날 잡고 언젠가 js만 모아서 또 디렉토리 만들고 패치해줘야지



- 일단 ```/_includes/sidbar.html```에 ```<div id="toc"></div>```를 넣고,
  ```/_includes/script.html```에 

  <script src="/toc.js"></script>
  <script type="text/javascript">
        $(document).ready(function() {
            $('#toc').toc();
        });
  </script>

  를 넣으니 잘 실행됐다.

- 문제가있다면 내 블로그의 카테고리나 게시글 페이지에선 toc이 나오면 안되고, 포스트에 들어가야만 toc이 보여야 한다는것이다.

- ```/_includes/sidbar.html```에서 if문을 어찌어찌 예쁘게 걸어줘야할것같은데, 서칭을 해보자