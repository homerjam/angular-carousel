# angular-carousel2

A carousel directive for angular


## Installation

`npm i -S angular-carousel2`


## Demo

http://homerjam.github.io/angular-carousel2/


## Example

1. Include `angular-carousel.js` in your project

2. Add `hj.carousel` to your app dependencies

3. Add and customise the CSS from `example/style.css`

4. Add directive to your template as below, see available options near the top of the source file

```
<div hj-carousel="slide in vm.slides" hj-carousel-options="vm.options">

	<div class="slide">

		<img src="{{slide.src}}" />

	</div>

</div>
```