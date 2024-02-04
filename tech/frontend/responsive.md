# Responsive Web Design

![Responsive Design](/images/responsive_design.png)

[Mozilla Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

## What is RWD(Responsive Web Design)

A web design approach to make web pages render well on all screen sizes and resolutions while ensuring good usability.

## Media Queries

Media queries allow us to run a series of tests (e.g. whether the user's screen is greater than a certain width, or a certain resolution) and apply CSS selectively to style the page appropriately for the user's needs.


``` css
@media screen and (min-width: 80rem) {
  .container {
    margin: 1em 2em;
  }
}
```

The above media query tests to see if the current web page is being displayed as screen media (therefore not a printed document) and the viewport is at least 80rem wide. The CSS for the .container selector will only be applied if these two things are true.

The points at which a media query is introduced, and the layout changed, are known as **breakpoints**.

A common approach when using Media Queries is to create a simple single-column layout for narrow-screen devices (e.g. mobile phones), then check for wider screens and implement a multiple-column layout when you know that you have enough screen width to handle it. Designing for mobile first is known as mobile first design.

If using breakpoints, best practices encourage defining media query breakpoints with **relative units**(like `rem`, `vw`, etc) rather than absolute sizes(like px) of an individual device.

Media queries can help with RWD, but are not a requirement. Flexible grids, relative units, and minimum and maximum unit values can be used without queries.

## RWD Technologies other than Media Queries

Responsive sites are built on **flexible grids**, meaning you don't need to target every possible device size with pixel perfect layouts.

By using a flexible grid, you can change a feature or add in a **breakpoint** and change the design at the point where the content starts to look bad. 

For example, to ensure line lengths don't become unreadably long as the screen size increases you can use [columns](https://developer.mozilla.org/en-US/docs/Web/CSS/columns); if a box becomes squashed with two words on each line as it narrows you can set a breakpoint.

Several layout methods, including [Multiple-column layout](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Multiple-column_Layout), [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox), and [Grid](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids) are **responsive by default**. They all assume that you are trying to create a flexible grid and give you easier ways to do so.

## Multicol(Multiple-column)