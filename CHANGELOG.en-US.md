---
order: 6
title: Change Log
toc: false
timeline: true
---

`antd` strictly follows [Semantic Versioning 2.0.0](http://semver.org/).

#### Release Schedule

- Weekly release: patch version at the end of every week for routine bugfix (anytime for urgent bugfix).
- Monthly release: minor version at the end of every month for new features.
- Major version release is not included in this schedule for breaking change and new features.

---

## 5.0.1

`2022-11-22`

- π Optimize Empty svg color in dark theme. [#38785](https://github.com/ant-design/ant-design/pull/38785)
- π Fix Form, Input, Select, Tree part style convert to CSS-in-JS missing. [#38742](https://github.com/ant-design/ant-design/pull/38742)
- π Fix animation flick for some components in Firefox. [#38729](https://github.com/ant-design/ant-design/pull/38729)
- Menu
  - π Fix Menu SubMenu margin style. [#38714](https://github.com/ant-design/ant-design/pull/38714) [@JarvisArt](https://github.com/JarvisArt)
  - π Fix Menu height in dark theme. [#38741](https://github.com/ant-design/ant-design/pull/38741) [@LuciNyan](https://github.com/LuciNyan)
  - π Fix Menu SubMenu flicking when expanding. [#38748](https://github.com/ant-design/ant-design/pull/38748) [@JarvisArt](https://github.com/JarvisArt)
- π Fix that Table expanded icons are not alignedγ[#38823](https://github.com/ant-design/ant-design/pull/38823) [@turdiyev](https://github.com/turdiyev)
- π Fix FloatButton.BackTop missing animation. [#38770](https://github.com/ant-design/ant-design/pull/38770) [@li-jia-nan](https://github.com/li-jia-nan)
- π  Remove `Moment.js` dependency. [#38762](https://github.com/ant-design/ant-design/pull/38762)
- π  Fix `CompoundedComponent` ts errorγ[#38666](https://github.com/ant-design/ant-design/pull/38666) [@wangcch](https://github.com/wangcch)
- π  Rollback `lib` in packageγ[#38832](https://github.com/ant-design/ant-design/pull/38832) [@chunsch](https://github.com/chunsch)

## 5.0.0

`2022-11-18`

π Ant Design 5.0.0 is released, see our [release note](https://github.com/ant-design/ant-design/issues/38671) for more details.

#### Read it before migration

π If you want to migrate to Ant Design 5.0, please check [V4 to V5](/docs/react/migration-v5).

#### Major Changes

- π₯ New Components
  - π₯ FloatButton component, and refactor BackTop as child component of FloatButton. [#37520](https://github.com/ant-design/ant-design/pull/37520) [@li-jia-nan](https://github.com/li-jia-nan)
  - π₯ Tour component. [#37867](https://github.com/ant-design/ant-design/pull/37867) [#38469](https://github.com/ant-design/ant-design/pull/38469) [@heiyu4585](https://github.com/heiyu4585)
- π₯ New Component Variants
  - π₯ DatePicker add `presets` to support preset ranges for quick selection. [#38249](https://github.com/ant-design/ant-design/pull/38249)
  - π₯ Progress `circle` type support responsive `format` text for small size. [#38231](https://github.com/ant-design/ant-design/pull/38231) [@li-jia-nan](https://github.com/li-jia-nan)
  - π₯ Steps add `inline` type. [#38311](https://github.com/ant-design/ant-design/pull/38311) [@JarvisArt](https://github.com/JarvisArt)
- π New Design
  - π Change primary color to `#1677ff`. [#37254](https://github.com/ant-design/ant-design/pull/37254)
  - π Change basic border radius to `6px`, and support gradient radius. [#37146](https://github.com/ant-design/ant-design/pull/37146) [#37369](https://github.com/ant-design/ant-design/pull/37369)
  - π Optimize transition duration. [#37438](https://github.com/ant-design/ant-design/pull/37438)
  - π Optimize padding and remove border for some components. [#37283](https://github.com/ant-design/ant-design/pull/37283)
    - π Pagination remove border. [#37441](https://github.com/ant-design/ant-design/pull/37441)
    - π Optimize Timeline style. [#37465](https://github.com/ant-design/ant-design/pull/37465)
    - π Optimize Steps style. [#37473](https://github.com/ant-design/ant-design/pull/37473)
  - π Optimize focus style for some components. [#37483](https://github.com/ant-design/ant-design/pull/37483)
  - π Optimize style with large border radius.
    - π Optimize Table hover style. [#37370](https://github.com/ant-design/ant-design/pull/37370)
    - π Optimize Segmented hover style. [#37498](https://github.com/ant-design/ant-design/pull/37498)
    - π Optimize Dropdown hover style. [#37491](https://github.com/ant-design/ant-design/pull/37491)
    - π Optimize close button style for some components like Modal. [#37634](https://github.com/ant-design/ant-design/pull/37634)
    - π Optimize Menu style. [#38009](https://github.com/ant-design/ant-design/pull/38009)
    - π Optimize hover style for some more components. [#37433](https://github.com/ant-design/ant-design/pull/37433)
  - π Optimize Switch transition. [#37658](https://github.com/ant-design/ant-design/pull/37658)
  - π Optimize Anchor ink ball style. [#38616](https://github.com/ant-design/ant-design/pull/38616)
- π Export object `theme` which contains hooks and algorithms related with theme. [#36302](https://github.com/ant-design/ant-design/pull/36302)
  - π Add `theme.useToken` hook to get Design Token in context. [#36267](https://github.com/ant-design/ant-design/pull/36267)
  - π Preset algorithm
    - π Default algorithm `theme.defaultAlgorithm`. [#36175](https://github.com/ant-design/ant-design/pull/36175)
    - π Dark algorithm `theme.darkAlgorithm`. [#36546](https://github.com/ant-design/ant-design/pull/36546) [#36656](https://github.com/ant-design/ant-design/pull/36656)
    - π Compact algorithm `theme.compactAlgorithm`. [#38105](https://github.com/ant-design/ant-design/pull/38105)
- π ConfigProvider support `theme` prop to modify theme configuration. For more: [Customize Theme](https://ant.design/docs/react/customize-theme-v5).
  - π Support multiple `algorithm` pipeline. [#37082](https://github.com/ant-design/ant-design/pull/37082)
  - π Support switching wireframe style. [#37507](https://github.com/ant-design/ant-design/pull/37507)
  - π Support override Design Token for single component. [#37568](https://github.com/ant-design/ant-design/pull/37568)
- π Add `locale` directory in package, which contains commonjs locale files. [#38194](https://github.com/ant-design/ant-design/pull/38194) [@chunsch](https://github.com/chunsch)
- π Do not support IE browser anymore.
- π Remove package `antd/lib`. [#36362](https://github.com/ant-design/ant-design/pull/36362)
  - π  Change `main` in `package.json` to `dist/antd.js`. [eb8835f](https://github.com/ant-design/ant-design/commit/eb8835fe29b39767c0f5e310f5c69619a75d5840)
- π Remove `dist/antd.css`, and add `dist/reset.css` to override common styles. [#36224](https://github.com/ant-design/ant-design/pull/36224)
- π Deprecate `visible` and provide `open` instead in components below. [@yykoypj](https://github.com/yykoypj)
  - π Tag deprecate `visible`. [#36671](https://github.com/ant-design/ant-design/pull/36671)
  - π Table deprecate `filterDropdownVisible` and provide `filterDropdownOpen`. [#36747](https://github.com/ant-design/ant-design/pull/36747)
  - π Drawer deprecate `visible` and provide `open` instead. [#36750](https://github.com/ant-design/ant-design/pull/36750)
  - π Modal deprecate `visible` and provide `open` instead. [#36774](https://github.com/ant-design/ant-design/pull/36774)
  - π Dropdown deprecate `visible` and provide `open` instead. [#36799](https://github.com/ant-design/ant-design/pull/36799)
  - π Tooltip deprecate `visible` and provide `open` instead, Popover and Popconfirm. [#36807](https://github.com/ant-design/ant-design/pull/36807)
- π Deprecate `dropdownClassName` and provide `popupClassName` instead in components below. [@heiyu4585](https://github.com/heiyu4585)
  - π AutoComplete deprecate `dropdownClassName` and provide `popupClassName` instead. [#37087](https://github.com/ant-design/ant-design/pull/37087)
  - π Mentions deprecate `dropdownClassName` and provide `popupClassName` instead. [#37122](https://github.com/ant-design/ant-design/pull/37122)
  - π Cascader deprecate `dropdownClassName` and provide `popupClassName` instead. [#37089](https://github.com/ant-design/ant-design/pull/37089)
  - π Select deprecate `dropdownClassName` and provide `popupClassName` instead. [#37091](https://github.com/ant-design/ant-design/pull/37091)
  - π TreeSelect deprecate `dropdownClassName` and provide `popupClassName` instead. [#37092](https://github.com/ant-design/ant-design/pull/37092)
  - π DatePicker and TimePicker deprecate `dropdownClassName` and provide `popupClassName` instead. [#37207](https://github.com/ant-design/ant-design/pull/37207)
- π  Refactor styles with CSS-in-JS for all components.
  - π Remove less and css in package. [#36244](https://github.com/ant-design/ant-design/pull/36244)
- π  Change date library from Moment.js to Day.js, for more: [Use custom date library](https://ant.design/docs/react/use-custom-date-library). [b22815d](https://github.com/ant-design/ant-design/commit/b22815d4d223b80755b472e14d7888beab8dd1da) [@iamkun](https://github.com/iamkun)
- π  React Notification to support React 18 concurrent mode and refactor useNotification hookοΌwhich is preferred instead of static function. [#35423](https://github.com/ant-design/ant-design/pull/35423) [#35568](https://github.com/ant-design/ant-design/pull/35568)
- π  Slider props related with Tooltip are unified into `tooltip`. [#37043](https://github.com/ant-design/ant-design/pull/37043) [@yykoypj](https://github.com/yykoypj)
- π  Migrate official site to [dumi@2](https://next.d.umijs.org/). [#38328](https://github.com/ant-design/ant-design/pull/38328)

## 4.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/4.x-stable/CHANGELOG.en-US.md) to read `4.x` change logs.

## 3.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/3.x-stable/CHANGELOG.en-US.md) to read `3.x` change logs.

## 2.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/2.x-stable/CHANGELOG.en-US.md) to read `2.x` change logs.

## 1.11.4

Visit [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) to read change logs from `0.x` to `1.x`.
