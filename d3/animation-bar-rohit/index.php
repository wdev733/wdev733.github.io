<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>PHP Customizable Bar Chart</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/handsontable@7.4.0/dist/handsontable.full.min.css" rel="stylesheet" media="screen">
    <link rel="stylesheet" href="assets/css/stylesheet.css">
    <link rel="stylesheet" href="assets/css/page.css">
    <link rel="stylesheet" href="assets/css/responsive.css">
</head>

<body class="visualisation-editor tab-preview published edited">
    <header>
        <h3>Customizable Bar Chart</h3>
    </header>
    <div class="row editor-bar">
        <div id="preview-menu" class="row-menu left no-select">
            <a id="full-preview" href="preview" target="_blank" class="menu-item clickable popup" data-popup-head="Full preview in new window">
                <i class="fa fa-expand"></i>
            </a>
        </div>
        <span class="tab-buttons" id="visualisation-tabs">
		<button name="show-pane" value="preview" class="clickable no-select active"><i class="fa fa-chart-area"></i>Preview</button>
		<button name="show-pane" value="data" class="clickable no-select"><i class="fa fa-table"></i>Data</button>
		</span>
    </div>

    <main>
        <div class="tab-panes">
            <div class="tab-pane tab-preview active">
                <div class="row editor">
                    <div class="row-inner">
                        <div id="visualisation" class="full-screen-ready">
                            <div id="visualisation-inner" class="editor-core">
                                <div class="preview-holder">
                                    <div id="chart_wrapper"></div>
                                </div>
                            </div>
                            <div class="side-panel">
                                <div class="side-panel-inner">
                                    <form class="template-settings" novalidate="">
                                        <div class="settings-block">
                                            <h2 class="no-select" tabindex="0"><i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>Bars</h2>
                                            <div class="settings-option option-type-boolean settings-buttons width-half">
                                                <label for="setting-column_chart">
                                                    <h3 class="no-select">Chart style</h3></label>
                                                <div id="setting-column_chart" name="column_chart" class="buttons-container">
                                                    <input type="radio" name="column_chart" value="false" id="column_chart_0" checked="checked">
                                                    <label for="column_chart_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Horizontal</label>
                                                    <input type="radio" name="column_chart" value="true" id="column_chart_1">
                                                    <label for="column_chart_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Vertical</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-number_of_bars">
                                                    <h3 class="no-select">No. bars</h3></label>
                                                <input id="setting-number_of_bars" name="number_of_bars" type="number" min="1">
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-bar_margin">
                                                    <h3 class="no-select">Spacing (%)</h3></label>
                                                <input id="setting-bar_margin" name="bar_margin" type="number" min="0" max="99">
                                            </div>
                                            <div class="settings-option option-type-string settings-buttons width-half">
                                                <label for="setting-height_mode">
                                                    <h3 class="no-select">Bar height</h3></label>
                                                <div id="setting-height_mode" name="height_mode" class="buttons-container">
                                                    <input type="radio" name="height_mode" value="fill_space" id="height_mode_0">
                                                    <label for="height_mode_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Fill space</label>
                                                    <input type="radio" name="height_mode" value="specified" id="height_mode_1">
                                                    <label for="height_mode_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Specified</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-bar_height">
                                                    <h3 class="no-select">Height</h3></label>
                                                <input id="setting-bar_height" name="bar_height" type="number" min="0" max="99" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-boolean">
                                                <label for="setting-bar_empty_spaces">
                                                    <h3 class="no-select">Leave spaces if fewer bars than specified</h3></label>
                                                <input id="setting-bar_empty_spaces" name="bar_empty_spaces" type="checkbox">
                                                <label class="slider" for="setting-bar_empty_spaces"></label>
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Sorting</h3>
                                            <div class="settings-option option-type-boolean settings-buttons width-half">
                                                <label for="setting-sort_enabled">
                                                    <h3 class="no-select">Sorting</h3></label>
                                                <div id="setting-sort_enabled" name="sort_enabled" class="buttons-container">
                                                    <input type="radio" name="sort_enabled" value="true" id="sort_enabled_0">
                                                    <label for="sort_enabled_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">On</label>
                                                    <input type="radio" name="sort_enabled" value="false" id="sort_enabled_1">
                                                    <label for="sort_enabled_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Off</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-boolean settings-buttons width-half">
                                                <label for="setting-sort_ascending">
                                                    <h3 class="no-select">Default sort mode</h3></label>
                                                <div id="setting-sort_ascending" name="sort_ascending" class="buttons-container">
                                                    <input type="radio" name="sort_ascending" value="false" id="sort_ascending_0">
                                                    <label for="sort_ascending_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Highest</label>
                                                    <input type="radio" name="sort_ascending" value="true" id="sort_ascending_1">
                                                    <label for="sort_ascending_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Lowest</label>
                                                </div>
                                            </div>
                                            <div class="settings-divider"></div>
                                            <div class="settings-option option-type-number">
                                                <label for="setting-bar_min_value">
                                                    <h3 class="no-select">Hide bars below value</h3></label>
                                                <input id="setting-bar_min_value" name="bar_min_value" type="number" min="0">
                                            </div>
                                        </div>
                                        <div class="settings-block">
                                            <h2 class="no-select" tabindex="0"><i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>Bar colors</h2>
                                            <div class="settings-option option-type-string settings-buttons">
                                                <label for="setting-color_mode">
                                                    <h3 class="no-select">Color mode</h3></label>
                                                <div id="setting-color_mode" name="color_mode" class="buttons-container">
                                                    <input type="radio" name="color_mode" value="bar" id="color_mode_1" checked="checked">
                                                    <label for="color_mode_1" style="width: 50%; border-radius: 3px 0px 0px 3px;">By bar</label>
                                                    <input type="radio" name="color_mode" value="single" id="color_mode_2">
                                                    <label for="color_mode_2" style="width: 50%; border-radius: 0px 3px 3px 0px;">Single</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color hidden width-quarter">
                                                <label for="setting-color_single">
                                                    <h3 class="no-select">Single color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-color_single" name="color_single" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string settings-buttons width-full hidden">
                                                <label for="setting-color.scale_type">
                                                    <h3 class="no-select">Scale type</h3></label>
                                                <div id="setting-color.scale_type" name="color.scale_type" class="buttons-container">
                                                    <input type="radio" name="color.scale_type" value="categorical" id="color.scale_type_0">
                                                    <label for="color.scale_type_0" style="width: 33.3333%; border-radius: 3px 0px 0px 3px;">Categorical</label>
                                                    <input type="radio" name="color.scale_type" value="sequential" id="color.scale_type_1">
                                                    <label for="color.scale_type_1" style="width: 33.3333%;">Sequential</label>
                                                    <input type="radio" name="color.scale_type" value="diverging" id="color.scale_type_2">
                                                    <label for="color.scale_type_2" style="width: 33.3333%; border-radius: 0px 3px 3px 0px;">Diverging</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string settings-buttons width-full hidden">
                                                <label for="setting-color.categorical_type" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <div id="setting-color.categorical_type" name="color.categorical_type" class="buttons-container">
                                                    <input type="radio" name="color.categorical_type" value="palette" id="color.categorical_type_0">
                                                    <label for="color.categorical_type_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Palette</label>
                                                    <input type="radio" name="color.categorical_type" value="generated" id="color.categorical_type_1">
                                                    <label for="color.categorical_type_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Generated</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-colors width-full">
                                                <label for="setting-color.categorical_palette">
                                                    <h3 class="no-select">Palette</h3></label><span class="color-swatches"><span data-index="0" style="background-color:#5F4690"></span><span data-index="1" style="background-color:#1D6996"></span><span data-index="2" style="background-color:#38A6A5"></span><span data-index="3" style="background-color:#0F8554"></span><span data-index="4" style="background-color:#73AF48"></span><span data-index="5" style="background-color:#EDAD08"></span><span data-index="6" style="background-color:#E17C05"></span><span data-index="7" style="background-color:#CC503E"></span><span data-index="8" style="background-color:#94346E"></span><span data-index="9" style="background-color:#6F4070"></span><span data-index="10" style="background-color:#994E95"></span><span data-index="11" style="background-color:#666666"></span></span>
                                                <input id="setting-color.categorical_palette" name="color.categorical_palette" type="text" class="colors" data-autocomplete="color.categorical_palette-dropdown" autocomplete="off" data-value="#5F4690|#1D6996|#38A6A5|#0F8554|#73AF48|#EDAD08|#E17C05|#CC503E|#94346E|#6F4070|#994E95|#666666"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="color.categorical_palette-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
<!--                                             <div class="settings-option option-type-boolean width-half">
                                                <label for="setting-color.categorical_extend">
                                                    <h3 class="no-select">Auto-extend</h3></label>
                                                <input id="setting-color.categorical_extend" name="color.categorical_extend" type="checkbox">
                                                <label class="slider" for="setting-color.categorical_extend"></label>
                                            </div> -->
                                            <div class="settings-option option-type-color hidden width-half">
                                                <label for="setting-color.categorical_seed_color">
                                                    <h3 class="no-select">Seed color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-color.categorical_seed_color" name="color.categorical_seed_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-half">
                                                <label for="setting-color.categorical_rotation_angle">
                                                    <h3 class="no-select">Hue rotation angle</h3></label>
                                                <input id="setting-color.categorical_rotation_angle" name="color.categorical_rotation_angle" type="number" min="0" max="360" step="0.1">
                                            </div>
                                            <div class="settings-option option-type-string hidden settings-buttons width-full">
                                                <label for="setting-color.categorical_color_space" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <div id="setting-color.categorical_color_space" name="color.categorical_color_space" class="buttons-container">
                                                    <input type="radio" name="color.categorical_color_space" value="hcl" id="color.categorical_color_space_0">
                                                    <label for="color.categorical_color_space_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">HCL</label>
                                                    <input type="radio" name="color.categorical_color_space" value="hsl" id="color.categorical_color_space_1">
                                                    <label for="color.categorical_color_space_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">HSL</label>
                                                </div>
                                            </div>
<!--                                             <div class="settings-option option-type-text">
                                                <label for="setting-color.categorical_custom_palette">
                                                    <h3 class="no-select">Color overrides</h3></label>
                                                <textarea id="setting-color.categorical_custom_palette" name="color.categorical_custom_palette" type="text"></textarea>
                                            </div> -->
                                            <div class="settings-option option-type-string hidden width-full">
                                                <label for="setting-color.sequential_palette">
                                                    <h3 class="no-select">Palette</h3></label>
                                                <input id="setting-color.sequential_palette" name="color.sequential_palette" type="text" data-autocomplete="color.sequential_palette-dropdown" autocomplete="off" data-value="Blues"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="color.sequential_palette-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color hidden width-quarter">
                                                <label for="setting-color.sequential_custom_min">
                                                    <h3 class="no-select">Minimum color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-color.sequential_custom_min" name="color.sequential_custom_min" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color hidden width-quarter">
                                                <label for="setting-color.sequential_custom_max">
                                                    <h3 class="no-select">Maximum color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-color.sequential_custom_max" name="color.sequential_custom_max" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string hidden settings-buttons width-full">
                                                <label for="setting-color.sequential_color_space" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <div id="setting-color.sequential_color_space" name="color.sequential_color_space" class="buttons-container">
                                                    <input type="radio" name="color.sequential_color_space" value="rgb" id="color.sequential_color_space_0">
                                                    <label for="color.sequential_color_space_0" style="width: 25%; border-radius: 3px 0px 0px 3px;">RGB</label>
                                                    <input type="radio" name="color.sequential_color_space" value="lab" id="color.sequential_color_space_1">
                                                    <label for="color.sequential_color_space_1" style="width: 25%;">LAB</label>
                                                    <input type="radio" name="color.sequential_color_space" value="hcl" id="color.sequential_color_space_2">
                                                    <label for="color.sequential_color_space_2" style="width: 25%;">HCL</label>
                                                    <input type="radio" name="color.sequential_color_space" value="hsl" id="color.sequential_color_space_3">
                                                    <label for="color.sequential_color_space_3" style="width: 25%; border-radius: 0px 3px 3px 0px;">HSL</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-boolean hidden width-full">
                                                <label for="setting-color.sequential_reverse">
                                                    <h3 class="no-select">Reverse scale</h3></label>
                                                <input id="setting-color.sequential_reverse" name="color.sequential_reverse" type="checkbox">
                                                <label class="slider" for="setting-color.sequential_reverse"></label>
                                            </div>
                                            <div class="settings-option option-type-string hidden width-full">
                                                <label for="setting-color.diverging_palette">
                                                    <h3 class="no-select">Palette</h3></label>
                                                <input id="setting-color.diverging_palette" name="color.diverging_palette" type="text" data-autocomplete="color.diverging_palette-dropdown" autocomplete="off" data-value="RdBu"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="color.diverging_palette-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color hidden width-quarter">
                                                <label for="setting-color.diverging_custom_min">
                                                    <h3 class="no-select">Minimum color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-color.diverging_custom_min" name="color.diverging_custom_min" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color hidden width-quarter">
                                                <label for="setting-color.diverging_custom_mid">
                                                    <h3 class="no-select">Midpoint color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-color.diverging_custom_mid" name="color.diverging_custom_mid" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color hidden width-quarter">
                                                <label for="setting-color.diverging_custom_max">
                                                    <h3 class="no-select">Maximum color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-color.diverging_custom_max" name="color.diverging_custom_max" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string hidden settings-buttons width-full">
                                                <label for="setting-color.diverging_color_space" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <div id="setting-color.diverging_color_space" name="color.diverging_color_space" class="buttons-container">
                                                    <input type="radio" name="color.diverging_color_space" value="rgb" id="color.diverging_color_space_0">
                                                    <label for="color.diverging_color_space_0" style="width: 25%; border-radius: 3px 0px 0px 3px;">RGB</label>
                                                    <input type="radio" name="color.diverging_color_space" value="lab" id="color.diverging_color_space_1">
                                                    <label for="color.diverging_color_space_1" style="width: 25%;">LAB</label>
                                                    <input type="radio" name="color.diverging_color_space" value="hcl" id="color.diverging_color_space_2">
                                                    <label for="color.diverging_color_space_2" style="width: 25%;">HCL</label>
                                                    <input type="radio" name="color.diverging_color_space" value="hsl" id="color.diverging_color_space_3">
                                                    <label for="color.diverging_color_space_3" style="width: 25%; border-radius: 0px 3px 3px 0px;">HSL</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-boolean hidden width-full">
                                                <label for="setting-color.diverging_reverse">
                                                    <h3 class="no-select">Reverse scale</h3></label>
                                                <input id="setting-color.diverging_reverse" name="color.diverging_reverse" type="checkbox">
                                                <label class="slider" for="setting-color.diverging_reverse"></label>
                                            </div>
                                            <div class="settings-option option-type-text hidden">
                                                <label for="setting-color_single_overrides">
                                                    <h3 class="no-select">Color overrides</h3></label>
                                                <textarea id="setting-color_single_overrides" name="color_single_overrides" type="text"></textarea>
                                            </div>
                                            <div class="settings-option option-type-number">
                                                <label for="setting-bar_opacity">
                                                    <h3 class="no-select">Bar opacity</h3></label>
                                                <input id="setting-bar_opacity" name="bar_opacity" type="number" min="0" max="1" step="0.1">
                                            </div>
                                        </div>
                                        <div class="settings-block">
                                            <h2 class="no-select" tabindex="0"><i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>Labels</h2>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-label_max_size">
                                                    <h3 class="no-select">Max font size</h3></label>
                                                <input id="setting-label_max_size" name="label_max_size" type="number" min="0" step="0.1">
                                            </div>
                                            <div class="settings-option option-type-string width-three-quarters">
                                                <label for="setting-label_mode">
                                                    <h3 class="no-select">Labels mode</h3></label>
                                                <input id="setting-label_mode" name="label_mode" type="text" data-autocomplete="label_mode-dropdown" autocomplete="off" data-value="axis"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="label_mode-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Bar labels</h3>
                                            <div class="settings-option option-type-color width-quarter">
                                                <label for="setting-label_color_in">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-label_color_in" name="label_color_in" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number width-half">
                                                <label for="setting-label_axis_width">
                                                    <h3 class="no-select">Space</h3></label>
                                                <input id="setting-label_axis_width" name="label_axis_width" type="number" min="0" step="0.25">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Values</h3>
                                            <div class="settings-option option-type-boolean width-half">
                                                <label for="setting-show_value">
                                                    <h3 class="no-select">Show value</h3></label>
                                                <input id="setting-show_value" name="show_value" type="checkbox">
                                                <label class="slider" for="setting-show_value"></label>
                                            </div>
                                            <div class="settings-option option-type-color width-quarter">
                                                <label for="setting-label_color_out">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-label_color_out" name="label_color_out" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-padding_right">
                                                    <h3 class="no-select">Space</h3></label>
                                                <input id="setting-padding_right" name="padding_right" type="number" min="0" step="0.25">
                                            </div>
                                        </div>
                                        <div class="settings-block">
                                            <h2 class="no-select" tabindex="0"><i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>Images</h2>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Images</h3>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-image_height">
                                                    <h3 class="no-select">Height</h3></label>
                                                <input id="setting-image_height" name="image_height" type="number" min="0">
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-image_width">
                                                    <h3 class="no-select">Width</h3></label>
                                                <input id="setting-image_width" name="image_width" type="number" min="0">
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-image_margin_right">
                                                    <h3 class="no-select">Margin right</h3></label>
                                                <input id="setting-image_margin_right" name="image_margin_right" type="number">
                                            </div>
                                            <div class="settings-option option-type-string settings-buttons width-three-quarters">
                                                <label for="setting-image_scale">
                                                    <h3 class="no-select">Image sizing</h3></label>
                                                <div id="setting-image_scale" name="image_scale" class="buttons-container">
                                                    <input type="radio" name="image_scale" value="fill" id="image_scale_0">
                                                    <label for="image_scale_0" style="width: 33.3333%; border-radius: 3px 0px 0px 3px;">Fill</label>
                                                    <input type="radio" name="image_scale" value="fit" id="image_scale_1">
                                                    <label for="image_scale_1" style="width: 33.3333%;">Fit</label>
                                                    <input type="radio" name="image_scale" value="stretch" id="image_scale_2">
                                                    <label for="image_scale_2" style="width: 33.3333%; border-radius: 0px 3px 3px 0px;">Stretch</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-boolean settings-buttons width-three-quarters">
                                                <label for="setting-image_circle">
                                                    <h3 class="no-select">Shape</h3></label>
                                                <div id="setting-image_circle" name="image_circle" class="buttons-container">
                                                    <input type="radio" name="image_circle" value="false" id="image_circle_0">
                                                    <label for="image_circle_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Original</label>
                                                    <input type="radio" name="image_circle" value="true" id="image_circle_1">
                                                    <label for="image_circle_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Circle</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="settings-block">
                                            <h2 class="no-select" tabindex="0"><i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>Time counter &amp; totalizer</h2>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Current time counter</h3>
                                            <div class="settings-option option-type-boolean">
                                                <label for="setting-counter">
                                                    <h3 class="no-select">Show current time</h3></label>
                                                <input id="setting-counter" name="counter" type="checkbox">
                                                <label class="slider" for="setting-counter"></label>
                                            </div>
                                            <div class="settings-option option-type-number">
                                                <label for="setting-counter_font_size">
                                                    <h3 class="no-select">Size (% of screen)</h3></label>
                                                <input id="setting-counter_font_size" name="counter_font_size" type="number" min="0">
                                            </div>
                                            <div class="settings-option option-type-color width-quarter">
                                                <label for="setting-counter_color">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-counter_color" name="counter_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-counter_line_height">
                                                    <h3 class="no-select">Line height</h3></label>
                                                <input id="setting-counter_line_height" name="counter_line_height" type="number" min="0" max="2" step="0.1">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">total</h3>
                                            <div class="settings-option option-type-boolean">
                                                <label for="setting-totaliser">
                                                    <h3 class="no-select">Show total</h3></label>
                                                <input id="setting-totaliser" name="totaliser" type="checkbox">
                                                <label class="slider" for="setting-totaliser"></label>
                                            </div>
                                            <div class="settings-option option-type-number width-half">
                                                <label for="setting-totaliser_font_size">
                                                    <h3 class="no-select">Size (% of screen)</h3></label>
                                                <input id="setting-totaliser_font_size" name="totaliser_font_size" type="number" min="0">
                                            </div>
                                            <div class="settings-option option-type-color width-quarter">
                                                <label for="setting-totaliser_color">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-totaliser_color" name="totaliser_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string width-quarter">
                                                <label for="setting-totaliser_label">
                                                    <h3 class="no-select">Label</h3></label>
                                                <input id="setting-totaliser_label" name="totaliser_label" type="text">
                                            </div>
                                        </div>
                                        <div class="settings-block">
                                            <h2 class="no-select" tabindex="0"><i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>Captions</h2>
                                            <div class="settings-option option-type-color width-quarter">
                                                <label for="setting-caption_background_color">
                                                    <h3 class="no-select">Background</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-caption_background_color" name="caption_background_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color width-quarter">
                                                <label for="setting-caption_border_color">
                                                    <h3 class="no-select">Border</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-caption_border_color" name="caption_border_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-caption_opacity">
                                                    <h3 class="no-select">Opacity</h3></label>
                                                <input id="setting-caption_opacity" name="caption_opacity" type="number" min="0" max="1" step="0.1">
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-caption_padding">
                                                    <h3 class="no-select">Padding</h3></label>
                                                <input id="setting-caption_padding" name="caption_padding" type="number" min="0" step="0.1">
                                            </div>
                                            <div class="settings-option option-type-string settings-buttons width-half">
                                                <label for="setting-caption_text_align">
                                                    <h3 class="no-select">Align</h3></label>
                                                <div id="setting-caption_text_align" name="caption_text_align" class="buttons-container">
                                                    <input type="radio" name="caption_text_align" value="flex-start" id="caption_text_align_0">
                                                    <label for="caption_text_align_0" style="width: 33.3333%; border-radius: 3px 0px 0px 3px;"><i class="fa fa-align-left"></i></label>
                                                    <input type="radio" name="caption_text_align" value="center" id="caption_text_align_1">
                                                    <label for="caption_text_align_1" style="width: 33.3333%;"><i class="fa fa-align-center"></i></label>
                                                    <input type="radio" name="caption_text_align" value="flex-end" id="caption_text_align_2">
                                                    <label for="caption_text_align_2" style="width: 33.3333%; border-radius: 0px 3px 3px 0px;"><i class="fa fa-align-right"></i></label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string width-half">
                                                <label for="setting-caption_position">
                                                    <h3 class="no-select">Position</h3></label>
                                                <input id="setting-caption_position" name="caption_position" type="text" data-autocomplete="caption_position-dropdown" autocomplete="off" data-value="center-center"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="caption_position-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Text</h3>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-caption_font_size">
                                                    <h3 class="no-select">Font size</h3></label>
                                                <input id="setting-caption_font_size" name="caption_font_size" type="number" min="0" step="0.1">
                                            </div>
                                            <div class="settings-option option-type-color width-quarter">
                                                <label for="setting-caption_text_color">
                                                    <h3 class="no-select">Text</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-caption_text_color" name="caption_text_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string width-half">
                                                <label for="setting-caption_mode">
                                                    <h3 class="no-select">Content mode</h3></label>
                                                <input id="setting-caption_mode" name="caption_mode" type="text" data-autocomplete="caption_mode-dropdown" autocomplete="off" data-value="text_legend"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="caption_mode-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-divider hidden"></div>
                                            <h3 class="settings-subhead hidden">Image</h3>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-caption_image_width">
                                                    <h3 class="no-select">Width</h3></label>
                                                <input id="setting-caption_image_width" name="caption_image_width" type="number" min="0" max="80">
                                            </div>
                                            <div class="settings-option option-type-string width-half">
                                                <label for="setting-caption_image_position">
                                                    <h3 class="no-select">Position</h3></label>
                                                <input id="setting-caption_image_position" name="caption_image_position" type="text" data-autocomplete="caption_image_position-dropdown" autocomplete="off" data-value="column"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="caption_image_position-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-caption_space_between">
                                                    <h3 class="no-select">Space between</h3></label>
                                                <input id="setting-caption_space_between" name="caption_space_between" type="number" min="0" step="0.1">
                                            </div>
                                        </div>
                                        <div class="settings-block">
                                            <h2 class="no-select" tabindex="0"><i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>Controls</h2>
                                            <div class="settings-option option-type-boolean">
                                                <label for="setting-sort_control">
                                                    <h3 class="no-select">Show sort control</h3></label>
                                                <input id="setting-sort_control" name="sort_control" type="checkbox">
                                                <label class="slider" for="setting-sort_control"></label>
                                            </div>
                                            <div class="settings-option option-type-string hidden width-half">
                                                <label for="setting-sort_descending_text">
                                                    <h3 class="no-select">“Highest” label</h3></label>
                                                <input id="setting-sort_descending_text" name="sort_descending_text" type="text">
                                            </div>
                                            <div class="settings-option option-type-string hidden width-half">
                                                <label for="setting-sort_ascending_text">
                                                    <h3 class="no-select">“Lowest” label</h3></label>
                                                <input id="setting-sort_ascending_text" name="sort_ascending_text" type="text">
                                            </div>
                                        </div>
                                        <div class="settings-block">
                                            <h2 class="no-select" tabindex="0"><i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>Legend</h2>
                                            <div class="settings-option option-type-boolean settings-buttons">
                                                <label for="setting-legend.show_legend" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <div id="setting-legend.show_legend" name="legend.show_legend" class="buttons-container">
                                                    <input type="radio" name="legend.show_legend" value="true" id="legend.show_legend_0">
                                                    <label for="legend.show_legend_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Enabled</label>
                                                    <input type="radio" name="legend.show_legend" value="false" id="legend.show_legend_1">
                                                    <label for="legend.show_legend_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Disabled</label>
                                                </div>
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Text</h3>
                                            <div class="settings-option option-type-color width-quarter">
                                                <label for="setting-legend.text_color">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-legend.text_color" name="legend.text_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-legend.text_size">
                                                    <h3 class="no-select">Size</h3></label>
                                                <input id="setting-legend.text_size" name="legend.text_size" type="number" min="0" step="0.1">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <div class="settings-option option-type-string width-half">
                                                <label for="setting-legend.title">
                                                    <h3 class="no-select">Title</h3></label>
                                                <input id="setting-legend.title" name="legend.title" type="text">
                                            </div>
                                            <div class="settings-option option-type-string settings-buttons width-half">
                                                <label for="setting-legend.title_weight">
                                                    <h3 class="no-select">Weight</h3></label>
                                                <div id="setting-legend.title_weight" name="legend.title_weight" class="buttons-container">
                                                    <input type="radio" name="legend.title_weight" value="bold" id="legend.title_weight_0">
                                                    <label for="legend.title_weight_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Bold</label>
                                                    <input type="radio" name="legend.title_weight" value="normal" id="legend.title_weight_1">
                                                    <label for="legend.title_weight_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Normal</label>
                                                </div>
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Swatches</h3>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-legend.swatch_width">
                                                    <h3 class="no-select">Width</h3></label>
                                                <input id="setting-legend.swatch_width" name="legend.swatch_width" type="number" min="0" step="0.1">
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-legend.swatch_height">
                                                    <h3 class="no-select">Height</h3></label>
                                                <input id="setting-legend.swatch_height" name="legend.swatch_height" type="number" min="0" step="0.1">
                                            </div>
                                            <div class="settings-option option-type-number width-half">
                                                <label for="setting-legend.swatch_radius">
                                                    <h3 class="no-select">Roundness</h3></label>
                                                <input id="setting-legend.swatch_radius" name="legend.swatch_radius" type="number" min="0" step="1">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <div class="settings-option option-type-string settings-buttons">
                                                <label for="setting-legend.orientation">
                                                    <h3 class="no-select">Orientation</h3></label>
                                                <div id="setting-legend.orientation" name="legend.orientation" class="buttons-container">
                                                    <input type="radio" name="legend.orientation" value="horizontal" id="legend.orientation_0">
                                                    <label for="legend.orientation_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Horizontal</label>
                                                    <input type="radio" name="legend.orientation" value="vertical" id="legend.orientation_1">
                                                    <label for="legend.orientation_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Vertical</label>
                                                </div>
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Add data colors to header and caption text</h3>
                                            <div class="settings-option option-type-string settings-buttons">
                                                <label for="setting-text_legend" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <div id="setting-text_legend" name="text_legend" class="buttons-container">
                                                    <input type="radio" name="text_legend" value="auto" id="text_legend_0">
                                                    <label for="text_legend_0" style="width: 33.3333%; border-radius: 3px 0px 0px 3px;">Auto</label>
                                                    <input type="radio" name="text_legend" value="custom" id="text_legend_1">
                                                    <label for="text_legend_1" style="width: 33.3333%;">Custom</label>
                                                    <input type="radio" name="text_legend" value="off" id="text_legend_2">
                                                    <label for="text_legend_2" style="width: 33.3333%; border-radius: 0px 3px 3px 0px;">Off</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-boolean hidden width-half">
                                                <label for="setting-text_legend_title">
                                                    <h3 class="no-select">Title</h3></label>
                                                <input id="setting-text_legend_title" name="text_legend_title" type="checkbox">
                                                <label class="slider" for="setting-text_legend_title"></label>
                                            </div>
                                            <div class="settings-option option-type-boolean hidden width-half">
                                                <label for="setting-text_legend_subtitle">
                                                    <h3 class="no-select">Subtitle</h3></label>
                                                <input id="setting-text_legend_subtitle" name="text_legend_subtitle" type="checkbox">
                                                <label class="slider" for="setting-text_legend_subtitle"></label>
                                            </div>
                                            <div class="settings-option option-type-boolean hidden width-half">
                                                <label for="setting-text_legend_caption">
                                                    <h3 class="no-select">Captions</h3></label>
                                                <input id="setting-text_legend_caption" name="text_legend_caption" type="checkbox">
                                                <label class="slider" for="setting-text_legend_caption"></label>
                                            </div>
                                            <div class="settings-option option-type-boolean hidden width-half">
                                                <label for="setting-text_legend_bold">
                                                    <h3 class="no-select">Bold</h3></label>
                                                <input id="setting-text_legend_bold" name="text_legend_bold" type="checkbox">
                                                <label class="slider" for="setting-text_legend_bold"></label>
                                            </div>
                                        </div>
                                        <div class="settings-block">
                                            <h2 class="no-select" tabindex="0"><i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>Axis</h2>
                                            <div class="settings-option option-type-color width-quarter">
                                                <label for="setting-axis_text_color">
                                                    <h3 class="no-select">Text color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-axis_text_color" name="axis_text_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-axis_font_size">
                                                    <h3 class="no-select">Text size</h3></label>
                                                <input id="setting-axis_font_size" name="axis_font_size" type="number" step="0.25">
                                            </div>
                                            <div class="settings-option option-type-color width-quarter">
                                                <label for="setting-axis_color">
                                                    <h3 class="no-select">Line color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-axis_color" name="axis_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-axis_gridline_dash">
                                                    <h3 class="no-select">Line dash</h3></label>
                                                <input id="setting-axis_gridline_dash" name="axis_gridline_dash" type="number" min="0" max="5" step="0.25">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Scale</h3>
                                            <div class="settings-option option-type-string settings-buttons width-full">
                                                <label for="setting-scale_type">
                                                    <h3 class="no-select">Type</h3></label>
                                                <div id="setting-scale_type" name="scale_type" class="buttons-container">
                                                    <input type="radio" name="scale_type" value="auto" id="scale_type_0">
                                                    <label for="scale_type_0" style="width: 33.3333%; border-radius: 3px 0px 0px 3px;">Dynamic</label>
                                                    <input type="radio" name="scale_type" value="auto_fixed" id="scale_type_1">
                                                    <label for="scale_type_1" style="width: 33.3333%;">Fixed</label>
                                                    <input type="radio" name="scale_type" value="manual" id="scale_type_2">
                                                    <label for="scale_type_2" style="width: 33.3333%; border-radius: 0px 3px 3px 0px;">Custom</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number width-half">
                                                <label for="setting-scale_min">
                                                    <h3 class="no-select">Min axis range</h3></label>
                                                <input id="setting-scale_min" name="scale_min" type="number" min="0">
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-scale_max">
                                                    <h3 class="no-select">Max</h3></label>
                                                <input id="setting-scale_max" name="scale_max" type="number">
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-scale_min">
                                                    <h3 class="no-select">Min</h3></label>
                                                <input id="setting-scale_min" name="scale_min" type="number">
                                            </div>
                                        </div>
                                        <div class="settings-block">
                                            <h2 class="no-select" tabindex="0"><i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>Timeline &amp; animation</h2>
                                            <div class="settings-option option-type-boolean settings-buttons">
                                                <label for="setting-timeline.enabled" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <div id="setting-timeline.enabled" name="timeline.enabled" class="buttons-container">
                                                    <input type="radio" name="timeline.enabled" value="true" id="timeline.enabled_0">
                                                    <label for="timeline.enabled_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Enabled</label>
                                                    <input type="radio" name="timeline.enabled" value="false" id="timeline.enabled_1">
                                                    <label for="timeline.enabled_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Disabled</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color width-quarter">
                                                <label for="setting-timeline.color_axes">
                                                    <h3 class="no-select">Axes color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-timeline.color_axes" name="timeline.color_axes" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string width-half">
                                                <label for="setting-timeline.date_format_display">
                                                    <h3 class="no-select">X axis date format</h3></label>
                                                <input id="setting-timeline.date_format_display" name="timeline.date_format_display" type="text" data-autocomplete="timeline.date_format_display-dropdown" autocomplete="off" data-value=""><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="timeline.date_format_display-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
<!--                                             <div class="settings-option option-type-boolean width-half">
                                                <label for="setting-timeline.axis_nice_x">
                                                    <h3 class="no-select">Clean X axis</h3></label>
                                                <input id="setting-timeline.axis_nice_x" name="timeline.axis_nice_x" type="checkbox">
                                                <label class="slider" for="setting-timeline.axis_nice_x"></label>
                                            </div>
                                            <div class="settings-option option-type-boolean hidden width-half">
                                                <label for="setting-timeline.axis_nice_y">
                                                    <h3 class="no-select">Clean Y axis</h3></label>
                                                <input id="setting-timeline.axis_nice_y" name="timeline.axis_nice_y" type="checkbox">
                                                <label class="slider" for="setting-timeline.axis_nice_y"></label>
                                            </div>
                                            <div class="settings-option option-type-boolean width-half">
                                                <label for="setting-timeline.scrubber_snap">
                                                    <h3 class="no-select">Snap when scrubbing</h3></label>
                                                <input id="setting-timeline.scrubber_snap" name="timeline.scrubber_snap" type="checkbox">
                                                <label class="slider" for="setting-timeline.scrubber_snap"></label>
                                            </div> -->
                                            <div class="settings-option option-type-boolean width-half">
                                                <label for="setting-timeline.play_on_load">
                                                    <h3 class="no-select">Play on load</h3></label>
                                                <input id="setting-timeline.play_on_load" name="timeline.play_on_load" type="checkbox">
                                                <label class="slider" for="setting-timeline.play_on_load"></label>
                                            </div>
                                            <div class="settings-option option-type-boolean width-half">
                                                <label for="setting-timeline.loop">
                                                    <h3 class="no-select">Loop timeline</h3></label>
                                                <input id="setting-timeline.loop" name="timeline.loop" type="checkbox">
                                                <label class="slider" for="setting-timeline.loop"></label>
                                            </div>
                                            <div class="settings-option option-type-number width-full">
                                                <label for="setting-timeline.scrubber_height">
                                                    <h3 class="no-select">Scrubber height</h3></label>
                                                <input id="setting-timeline.scrubber_height" name="timeline.scrubber_height" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Margin</h3>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-timeline.margin.top">
                                                    <h3 class="no-select">Top</h3></label>
                                                <input id="setting-timeline.margin.top" name="timeline.margin.top" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-timeline.margin.left">
                                                    <h3 class="no-select">Left</h3></label>
                                                <input id="setting-timeline.margin.left" name="timeline.margin.left" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-timeline.margin.bottom">
                                                    <h3 class="no-select">Bottom</h3></label>
                                                <input id="setting-timeline.margin.bottom" name="timeline.margin.bottom" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-timeline.margin.right">
                                                    <h3 class="no-select">Right</h3></label>
                                                <input id="setting-timeline.margin.right" name="timeline.margin.right" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-number width-full">
                                                <label for="setting-timeline.playback_button.margin_right">
                                                    <h3 class="no-select">Space between button and timeline</h3></label>
                                                <input id="setting-timeline.playback_button.margin_right" name="timeline.playback_button.margin_right" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Graph</h3>
                                            <div class="settings-option option-type-boolean settings-buttons width-half">
                                                <label for="setting-timeline.graph">
                                                    <h3 class="no-select">Visibility</h3></label>
                                                <div id="setting-timeline.graph" name="timeline.graph" class="buttons-container">
                                                    <input type="radio" name="timeline.graph" value="true" id="timeline.graph_0">
                                                    <label for="timeline.graph_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Show</label>
                                                    <input type="radio" name="timeline.graph" value="false" id="timeline.graph_1">
                                                    <label for="timeline.graph_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Hide</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color hidden width-quarter">
                                                <label for="setting-timeline.color_background">
                                                    <h3 class="no-select">Background</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-timeline.color_background" name="timeline.color_background" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-boolean hidden width-quarter">
                                                <label for="setting-timeline.curve">
                                                    <h3 class="no-select">Curved lines</h3></label>
                                                <input id="setting-timeline.curve" name="timeline.curve" type="checkbox">
                                                <label class="slider" for="setting-timeline.curve"></label>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-full">
                                                <label for="setting-timeline.graph_height">
                                                    <h3 class="no-select">Graph height</h3></label>
                                                <input id="setting-timeline.graph_height" name="timeline.graph_height" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Playback button</h3>
                                            <div class="settings-option option-type-color width-half">
                                                <label for="setting-timeline.playback_button.button_color">
                                                    <h3 class="no-select">Button colour</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-timeline.playback_button.button_color" name="timeline.playback_button.button_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number width-half">
                                                <label for="setting-timeline.playback_button.button_size">
                                                    <h3 class="no-select">Button size</h3></label>
                                                <input id="setting-timeline.playback_button.button_size" name="timeline.playback_button.button_size" type="number" min="0" max="8" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-color width-half">
                                                <label for="setting-timeline.playback_button.icon_color">
                                                    <h3 class="no-select">Icon colour</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-timeline.playback_button.icon_color" name="timeline.playback_button.icon_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number width-half">
                                                <label for="setting-timeline.playback_button.icon_size">
                                                    <h3 class="no-select">Icon size</h3></label>
                                                <input id="setting-timeline.playback_button.icon_size" name="timeline.playback_button.icon_size" type="number" min="0" max="8" step="0.05">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Timing and animation</h3>
                                            <div class="settings-option option-type-number">
                                                <label for="setting-timeline.duration">
                                                    <h3 class="no-select">Timeline duration (s)</h3></label>
                                                <input id="setting-timeline.duration" name="timeline.duration" type="number" min="0" step="0.01">
                                            </div>
                                            <div class="settings-option option-type-number">
                                                <label for="setting-timeline.duration_tween">
                                                    <h3 class="no-select">Time transition duration (s)</h3></label>
                                                <input id="setting-timeline.duration_tween" name="timeline.duration_tween" type="number" min="0" step="0.01">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <div class="settings-option option-type-number">
                                                <label for="setting-animation_duration">
                                                    <h3 class="no-select">Bar rank animation duration (s)</h3></label>
                                                <input id="setting-animation_duration" name="animation_duration" type="number" step="0.05">
                                            </div>
                                        </div>
                                        <div class="settings-block">
                                            <h2 class="no-select" tabindex="0"><i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>Number formatting</h2>
<!--                                             <div class="settings-option option-type-string settings-buttons width-half">
                                                <label for="setting-localization.input_decimal_separator">
                                                    <h3 class="no-select">Decimal separator in data sheet</h3></label>
                                                <div id="setting-localization.input_decimal_separator" name="localization.input_decimal_separator" class="buttons-container">
                                                    <input type="radio" name="localization.input_decimal_separator" value="." id="localization.input_decimal_separator_0">
                                                    <label for="localization.input_decimal_separator_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">.</label>
                                                    <input type="radio" name="localization.input_decimal_separator" value="," id="localization.input_decimal_separator_1">
                                                    <label for="localization.input_decimal_separator_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">,</label>
                                                </div>
                                            </div> -->
<!--                                             <div class="settings-option option-type-string width-half">
                                                <label for="setting-localization.output_separators">
                                                    <h3 class="no-select">Number format to display</h3></label>
                                                <input id="setting-localization.output_separators" name="localization.output_separators" type="text" data-autocomplete="localization.output_separators-dropdown" autocomplete="off" data-value=",."><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="localization.output_separators-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Invalid cells</h3>
                                            <div class="settings-option option-type-string">
                                                <label for="setting-blank_cells">
                                                    <h3 class="no-select">How to handle blank/invalid cells</h3></label>
                                                <input id="setting-blank_cells" name="blank_cells" type="text" data-autocomplete="blank_cells-dropdown" autocomplete="off" data-value="interpolate"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="blank_cells-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div> -->
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Number styling</h3>
                                            <div class="settings-option option-type-string width-quarter">
                                                <label for="setting-value_format.prefix">
                                                    <h3 class="no-select">Prefix</h3></label>
                                                <input id="setting-value_format.prefix" name="value_format.prefix" type="text">
                                            </div>
                                            <div class="settings-option option-type-string width-quarter">
                                                <label for="setting-value_format.suffix">
                                                    <h3 class="no-select">Suffix</h3></label>
                                                <input id="setting-value_format.suffix" name="value_format.suffix" type="text">
                                            </div>
<!--                                             <div class="settings-option option-type-number width-half">
                                                <label for="setting-value_format.n_dec">
                                                    <h3 class="no-select">Decimal places</h3></label>
                                                <input id="setting-value_format.n_dec" name="value_format.n_dec" type="number" min="-10" max="10" step="1">
                                            </div> -->
<!--                                             <div class="settings-option option-type-boolean width-full">
                                                <label for="setting-value_format.strip_zeros">
                                                    <h3 class="no-select">Remove trailing zeros</h3></label>
                                                <input id="setting-value_format.strip_zeros" name="value_format.strip_zeros" type="checkbox">
                                                <label class="slider" for="setting-value_format.strip_zeros"></label>
                                            </div>
                                            <div class="settings-option option-type-boolean width-full">
                                                <label for="setting-value_format.strip_separator">
                                                    <h3 class="no-select">Hide thousands separator below 10,000</h3></label>
                                                <input id="setting-value_format.strip_separator" name="value_format.strip_separator" type="checkbox">
                                                <label class="slider" for="setting-value_format.strip_separator"></label>
                                            </div>
                                            <div class="settings-option option-type-boolean width-full">
                                                <label for="setting-value_format.transform_labels">
                                                    <h3 class="no-select">Multiply/divide values</h3></label>
                                                <input id="setting-value_format.transform_labels" name="value_format.transform_labels" type="checkbox">
                                                <label class="slider" for="setting-value_format.transform_labels"></label>
                                            </div> -->
                                            <div class="settings-option option-type-string hidden width-three-quarters">
                                                <label for="setting-value_format.transform" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <input id="setting-value_format.transform" name="value_format.transform" type="text" data-autocomplete="value_format.transform-dropdown" autocomplete="off" data-value="multiply"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="value_format.transform-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-value_format.multiply_divide_constant" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <input id="setting-value_format.multiply_divide_constant" name="value_format.multiply_divide_constant" type="number">
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-value_format.exponentiate_constant" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <input id="setting-value_format.exponentiate_constant" name="value_format.exponentiate_constant" type="number">
                                            </div>
                                        </div>
                                        <div class="settings-block">
                                            <h2 class="no-select" tabindex="0"><i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>Layout</h2>
<!--                                             <div class="settings-option option-type-font">
                                                <label for="setting-layout.body_font">
                                                    <h3 class="no-select">Font</h3></label>
                                                <input id="setting-layout.body_font" name="layout.body_font" class="font-menu" data-autocomplete="layout.body_font-dropdown" autocomplete="off"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="layout.body_font-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div> -->
                                            <div class="settings-option option-type-number">
                                                <label for="setting-layout.max_width">
                                                    <h3 class="no-select">Maximum width</h3></label>
                                                <input id="setting-layout.max_width" name="layout.max_width" type="number" min="50">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Background</h3>
                                            <div class="settings-option option-type-boolean settings-buttons width-half">
                                                <label for="setting-layout.background_color_enabled">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div id="setting-layout.background_color_enabled" name="layout.background_color_enabled" class="buttons-container">
                                                    <input type="radio" name="layout.background_color_enabled" value="true" id="layout.background_color_enabled_0">
                                                    <label for="layout.background_color_enabled_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">On</label>
                                                    <input type="radio" name="layout.background_color_enabled" value="false" id="layout.background_color_enabled_1">
                                                    <label for="layout.background_color_enabled_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Off</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-boolean settings-buttons width-half">
                                                <label for="setting-layout.background_image_enabled">
                                                    <h3 class="no-select">Image</h3></label>
                                                <div id="setting-layout.background_image_enabled" name="layout.background_image_enabled" class="buttons-container">
                                                    <input type="radio" name="layout.background_image_enabled" value="true" id="layout.background_image_enabled_0">
                                                    <label for="layout.background_image_enabled_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">On</label>
                                                    <input type="radio" name="layout.background_image_enabled" value="false" id="layout.background_image_enabled_1">
                                                    <label for="layout.background_image_enabled_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Off</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color width-quarter">
                                                <label for="setting-layout.background_color">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-layout.background_color" name="layout.background_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-url hidden width-half">
                                                <label for="setting-layout.background_image_src">
                                                    <h3 class="no-select">Image URL</h3></label>
                                                <input id="setting-layout.background_image_src" name="layout.background_image_src" type="url">
                                                <button type="button" class="upload" title="Upload a file from your computer">⬆︎</button>
                                            </div>
                                            <div class="settings-option option-type-string hidden width-quarter">
                                                <label for="setting-layout.background_image_size">
                                                    <h3 class="no-select">Size</h3></label>
                                                <input id="setting-layout.background_image_size" name="layout.background_image_size" type="text" data-autocomplete="layout.background_image_size-dropdown" autocomplete="off" data-value="cover"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="layout.background_image_size-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string hidden width-quarter">
                                                <label for="setting-layout.background_image_position">
                                                    <h3 class="no-select">Position</h3></label>
                                                <input id="setting-layout.background_image_position" name="layout.background_image_position" type="text" data-autocomplete="layout.background_image_position-dropdown" autocomplete="off" data-value="center center"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="layout.background_image_position-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-divider"></div>
<!--                                             <div class="settings-option option-type-string settings-buttons">
                                                <label for="setting-layout.layout_order">
                                                    <h3 class="no-select">Layout order</h3></label>
                                                <div id="setting-layout.layout_order" name="layout.layout_order" class="buttons-container">
                                                    <input type="radio" name="layout.layout_order" value="stack-default" id="layout.layout_order_0">
                                                    <label for="layout.layout_order_0" style="width: 25%; border-radius: 3px 0px 0px 3px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAdCAYAAAHZdKxuAAAAAXNSR0IArs4c6QAAANhJREFUSA3tVNEOwiAM7Iy/p2/wkTz6g5gjOVZZEepcjMmWLBTau95ugIh6lpzzLcb4wNpFJaRk9MIahxAyXmD7mC7BC2RlFbliQjFMpJTujOdGs/ECwRoP3rlKoEzNJlz3+CwutK0NLRVt2QhjggA9n2IGEKANMxmt0VVsEfxgzfX7zL3ZiqbXLjcKc8vEORk5/75mMB/7u11uuIpdbtDCc5R3l/s+e+pmHt1foza7Nv6IXOeHiqGk9zWtSk1cN2cPrItnYjZzHZEZYtacxHTiuANSO/xN8AS4uW8Rw1Gu2AAAAABJRU5ErkJggg=="></label>
                                                    <input type="radio" name="layout.layout_order" value="stack-2" id="layout.layout_order_1">
                                                    <label for="layout.layout_order_1" style="width: 25%;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAdCAYAAAHZdKxuAAAAAXNSR0IArs4c6QAAAMpJREFUSA3tVMsKwyAQNKW/l970Iz32Bw0jjKTrSLUY0oOBsO5rnOwYnTs9W0ppDyG8EcsOkw8uauu9T3jR2+75yJxBnnC4JxMxxlezg0V9VsJsIGz75TfKdlkpg3aPcT8TsPNRMJjZEIf5xaAAahUyE+RtfcZvtFLoFh95aFXxH4hCWpUoTCg7fxqUfB4yEcl/CJlNy5qbfuZA8m8CwJ77q2djSj50lnuAWbOAOQlXxCuRHxcUje2XzfgrYzBpHUXLkmxh181SpnEAB4Vg0DSGhHsAAAAASUVORK5CYII="></label>
                                                    <input type="radio" name="layout.layout_order" value="stack-3" id="layout.layout_order_2">
                                                    <label for="layout.layout_order_2" style="width: 25%;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAdCAYAAAHZdKxuAAAAAXNSR0IArs4c6QAAANFJREFUSA3tVEEOwyAMo9O+193gkRz3QSZHMmNRUkGp1guVqkCIHZMAITTfVkrZU0pv+B7NQpCV1vEdxxgLfmB9jEvwBBNzkjXn/HIRDOqzJs0GwS1eEmonAn52RITJaUYScd5KLl0fTQf58HVpIFlXMDPNBVMf2TDXPq7dZM2eelrMQ6uDucG50mlWzG/ooCWDvqENXldn1pcyhpgJWjYcPe5z5ZFrAgoe2LN0f2v1ZYq5UyofuiME99hFXKtUm1c9aoBmeEeRjVIQma6XpVblAwnpZjN/VjqsAAAAAElFTkSuQmCC"></label>
                                                    <input type="radio" name="layout.layout_order" value="stack-4" id="layout.layout_order_3">
                                                    <label for="layout.layout_order_3" style="width: 25%; border-radius: 0px 3px 3px 0px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAdCAYAAAHZdKxuAAAAAXNSR0IArs4c6QAAANtJREFUSA3tVNEOwjAI3Iy/p2/tR/bRH6zekmuA1glO45bYZAHKcdDCOk1izbXWC+0zlJzzDVJ5sNGW9qSUKj4QKY8yWvBDUWnoKKVcTzS2yWHiIfeMwm2yIbLbRL3DRJYubi+0bAPCkcvapO3AdFgZvuDuyJZR2i4wSpBBP9ZD7RsOLQ9gD/Y5ZmaA3EEHWY6r3SEwrzDEHLpnlvOXa4/7xttZfhNwyPdKcqLPaz6JlXpr9bNgCfbobw2ch5iY0CQzyCOPR9ya5zleBPNy3LxknAbiv1YxExxH3gEqBW7I4zw3PQAAAABJRU5ErkJggg=="></label>
                                                </div>
                                            </div> -->
                                            <div class="settings-option option-type-string settings-buttons width-three-quarters">
                                                <label for="setting-layout.space_between_sections">
                                                    <h3 class="no-select">Space between sections</h3></label>
                                                <div id="setting-layout.space_between_sections" name="layout.space_between_sections" class="buttons-container">
                                                    <input type="radio" name="layout.space_between_sections" value="0" id="layout.space_between_sections_0">
                                                    <label for="layout.space_between_sections_0" style="width: 25%; border-radius: 3px 0px 0px 3px;">▁</label>
                                                    <input type="radio" name="layout.space_between_sections" value="0.5" id="layout.space_between_sections_1">
                                                    <label for="layout.space_between_sections_1" style="width: 25%;">▃</label>
                                                    <input type="radio" name="layout.space_between_sections" value="1" id="layout.space_between_sections_2">
                                                    <label for="layout.space_between_sections_2" style="width: 25%;">▄</label>
                                                    <input type="radio" name="layout.space_between_sections" value="custom" id="layout.space_between_sections_3">
                                                    <label for="layout.space_between_sections_3" style="width: 25%; border-radius: 0px 3px 3px 0px;">...</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.space_between_sections_custom">
                                                    <h3 class="no-select">Custom</h3></label>
                                                <input id="setting-layout.space_between_sections_custom" name="layout.space_between_sections_custom" type="number" min="0" max="100" step="0.05">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Margins</h3>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-layout.margin_top">
                                                    <h3 class="no-select">Top</h3></label>
                                                <input id="setting-layout.margin_top" name="layout.margin_top" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-layout.margin_right">
                                                    <h3 class="no-select">Right</h3></label>
                                                <input id="setting-layout.margin_right" name="layout.margin_right" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-layout.margin_bottom">
                                                    <h3 class="no-select">Bottom</h3></label>
                                                <input id="setting-layout.margin_bottom" name="layout.margin_bottom" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-layout.margin_left">
                                                    <h3 class="no-select">Left</h3></label>
                                                <input id="setting-layout.margin_left" name="layout.margin_left" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Borders</h3>
                                            <div class="settings-option option-type-boolean">
                                                <label for="setting-layout.border.enabled">
                                                    <h3 class="no-select">Show borders around visualisation</h3></label>
                                                <input id="setting-layout.border.enabled" name="layout.border.enabled" type="checkbox">
                                                <label class="slider" for="setting-layout.border.enabled"></label>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.border.top.width">
                                                    <h3 class="no-select">Top</h3></label>
                                                <input id="setting-layout.border.top.width" name="layout.border.top.width" type="number" min="0">
                                            </div>
                                            <div class="settings-option option-type-string hidden width-half">
                                                <label for="setting-layout.border.top.style">
                                                    <h3 class="no-select">Style</h3></label>
                                                <input id="setting-layout.border.top.style" name="layout.border.top.style" type="text" data-autocomplete="layout.border.top.style-dropdown" autocomplete="off" data-value="solid"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="layout.border.top.style-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color hidden width-quarter">
                                                <label for="setting-layout.border.top.color">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-layout.border.top.color" name="layout.border.top.color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.border.right.width">
                                                    <h3 class="no-select">Right</h3></label>
                                                <input id="setting-layout.border.right.width" name="layout.border.right.width" type="number" min="0">
                                            </div>
                                            <div class="settings-option option-type-string hidden width-half">
                                                <label for="setting-layout.border.right.style">
                                                    <h3 class="no-select">Style</h3></label>
                                                <input id="setting-layout.border.right.style" name="layout.border.right.style" type="text" data-autocomplete="layout.border.right.style-dropdown" autocomplete="off" data-value="solid"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="layout.border.right.style-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color hidden width-quarter">
                                                <label for="setting-layout.border.right.color">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-layout.border.right.color" name="layout.border.right.color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.border.bottom.width">
                                                    <h3 class="no-select">Bottom</h3></label>
                                                <input id="setting-layout.border.bottom.width" name="layout.border.bottom.width" type="number" min="0">
                                            </div>
                                            <div class="settings-option option-type-string hidden width-half">
                                                <label for="setting-layout.border.bottom.style">
                                                    <h3 class="no-select">Style</h3></label>
                                                <input id="setting-layout.border.bottom.style" name="layout.border.bottom.style" type="text" data-autocomplete="layout.border.bottom.style-dropdown" autocomplete="off" data-value="solid"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="layout.border.bottom.style-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color hidden width-quarter">
                                                <label for="setting-layout.border.bottom.color">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-layout.border.bottom.color" name="layout.border.bottom.color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.border.left.width">
                                                    <h3 class="no-select">Left</h3></label>
                                                <input id="setting-layout.border.left.width" name="layout.border.left.width" type="number" min="0">
                                            </div>
                                            <div class="settings-option option-type-string hidden width-half">
                                                <label for="setting-layout.border.left.style">
                                                    <h3 class="no-select">Style</h3></label>
                                                <input id="setting-layout.border.left.style" name="layout.border.left.style" type="text" data-autocomplete="layout.border.left.style-dropdown" autocomplete="off" data-value="solid"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="layout.border.left.style-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color hidden width-quarter">
                                                <label for="setting-layout.border.left.color">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-layout.border.left.color" name="layout.border.left.color" type="color">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="settings-block">
                                            <h2 class="no-select" tabindex="0"><i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>Header</h2>
                                            <div class="settings-option option-type-string settings-buttons width-half">
                                                <label for="setting-layout.header_align">
                                                    <h3 class="no-select">Alignment</h3></label>
                                                <div id="setting-layout.header_align" name="layout.header_align" class="buttons-container">
                                                    <input type="radio" name="layout.header_align" value="left" id="layout.header_align_0">
                                                    <label for="layout.header_align_0" style="width: 33.3333%; border-radius: 3px 0px 0px 3px;"><i class="fa fa-align-left"></i></label>
                                                    <input type="radio" name="layout.header_align" value="center" id="layout.header_align_1">
                                                    <label for="layout.header_align_1" style="width: 33.3333%;"><i class="fa fa-align-center"></i></label>
                                                    <input type="radio" name="layout.header_align" value="right" id="layout.header_align_2">
                                                    <label for="layout.header_align_2" style="width: 33.3333%; border-radius: 0px 3px 3px 0px;"><i class="fa fa-align-right"></i></label>
                                                </div>
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Title</h3>
                                            <div class="settings-option option-type-string width-three-quarters">
                                                <label for="setting-layout.title" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <input id="setting-layout.title" name="layout.title" type="text">
                                            </div>
                                            <div class="settings-option option-type-boolean width-quarter">
                                                <label for="setting-layout.title_styling">
                                                    <h3 class="no-select">Styling</h3></label>
                                                <input id="setting-layout.title_styling" name="layout.title_styling" type="checkbox">
                                                <label class="slider" for="setting-layout.title_styling"></label>
                                            </div>
                                            <div class="settings-option option-type-string hidden settings-buttons width-three-quarters">
                                                <label for="setting-layout.title_size">
                                                    <h3 class="no-select">Size</h3></label>
                                                <div id="setting-layout.title_size" name="layout.title_size" class="buttons-container">
                                                    <input type="radio" name="layout.title_size" value="1.4" id="layout.title_size_0">
                                                    <label for="layout.title_size_0" style="width: 25%; border-radius: 3px 0px 0px 3px;">ᴀ</label>
                                                    <input type="radio" name="layout.title_size" value="1.6" id="layout.title_size_1">
                                                    <label for="layout.title_size_1" style="width: 25%;">A</label>
                                                    <input type="radio" name="layout.title_size" value="2" id="layout.title_size_2">
                                                    <label for="layout.title_size_2" style="width: 25%;"><i class="fa fa-font"></i></label>
                                                    <input type="radio" name="layout.title_size" value="custom" id="layout.title_size_3">
                                                    <label for="layout.title_size_3" style="width: 25%; border-radius: 0px 3px 3px 0px;">...</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.title_size_custom">
                                                    <h3 class="no-select">Custom</h3></label>
                                                <input id="setting-layout.title_size_custom" name="layout.title_size_custom" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-string hidden settings-buttons width-half">
                                                <label for="setting-layout.title_weight">
                                                    <h3 class="no-select">Weight</h3></label>
                                                <div id="setting-layout.title_weight" name="layout.title_weight" class="buttons-container">
                                                    <input type="radio" name="layout.title_weight" value="bold" id="layout.title_weight_0">
                                                    <label for="layout.title_weight_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Bold</label>
                                                    <input type="radio" name="layout.title_weight" value="normal" id="layout.title_weight_1">
                                                    <label for="layout.title_weight_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Regular</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color hidden width-quarter">
                                                <label for="setting-layout.title_color">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-layout.title_color" name="layout.title_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.title_line_height">
                                                    <h3 class="no-select">Line height</h3></label>
                                                <input id="setting-layout.title_line_height" name="layout.title_line_height" type="number" min="0" max="3" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-string hidden settings-buttons width-three-quarters">
                                                <label for="setting-layout.title_space_above">
                                                    <h3 class="no-select">Space above</h3></label>
                                                <div id="setting-layout.title_space_above" name="layout.title_space_above" class="buttons-container">
                                                    <input type="radio" name="layout.title_space_above" value="0" id="layout.title_space_above_0">
                                                    <label for="layout.title_space_above_0" style="width: 25%; border-radius: 3px 0px 0px 3px;">▁</label>
                                                    <input type="radio" name="layout.title_space_above" value="0.5" id="layout.title_space_above_1">
                                                    <label for="layout.title_space_above_1" style="width: 25%;">▃</label>
                                                    <input type="radio" name="layout.title_space_above" value="1" id="layout.title_space_above_2">
                                                    <label for="layout.title_space_above_2" style="width: 25%;">▄</label>
                                                    <input type="radio" name="layout.title_space_above" value="custom" id="layout.title_space_above_3">
                                                    <label for="layout.title_space_above_3" style="width: 25%; border-radius: 0px 3px 3px 0px;">...</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.title_space_above_custom">
                                                    <h3 class="no-select">Custom</h3></label>
                                                <input id="setting-layout.title_space_above_custom" name="layout.title_space_above_custom" type="number" min="0" max="100" step="0.05">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Subtitle</h3>
                                            <div class="settings-option option-type-string width-three-quarters">
                                                <label for="setting-layout.subtitle" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <input id="setting-layout.subtitle" name="layout.subtitle" type="text">
                                            </div>
                                            <div class="settings-option option-type-boolean width-quarter">
                                                <label for="setting-layout.subtitle_styling">
                                                    <h3 class="no-select">Styling</h3></label>
                                                <input id="setting-layout.subtitle_styling" name="layout.subtitle_styling" type="checkbox">
                                                <label class="slider" for="setting-layout.subtitle_styling"></label>
                                            </div>
                                            <div class="settings-option option-type-string hidden settings-buttons width-three-quarters">
                                                <label for="setting-layout.subtitle_size">
                                                    <h3 class="no-select">Size</h3></label>
                                                <div id="setting-layout.subtitle_size" name="layout.subtitle_size" class="buttons-container">
                                                    <input type="radio" name="layout.subtitle_size" value="1.4" id="layout.subtitle_size_0">
                                                    <label for="layout.subtitle_size_0" style="width: 25%; border-radius: 3px 0px 0px 3px;">ᴀ</label>
                                                    <input type="radio" name="layout.subtitle_size" value="1.6" id="layout.subtitle_size_1">
                                                    <label for="layout.subtitle_size_1" style="width: 25%;">A</label>
                                                    <input type="radio" name="layout.subtitle_size" value="2" id="layout.subtitle_size_2">
                                                    <label for="layout.subtitle_size_2" style="width: 25%;"><i class="fa fa-font"></i></label>
                                                    <input type="radio" name="layout.subtitle_size" value="custom" id="layout.subtitle_size_3">
                                                    <label for="layout.subtitle_size_3" style="width: 25%; border-radius: 0px 3px 3px 0px;">...</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.subtitle_size_custom">
                                                    <h3 class="no-select">Custom</h3></label>
                                                <input id="setting-layout.subtitle_size_custom" name="layout.subtitle_size_custom" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-string hidden settings-buttons width-half">
                                                <label for="setting-layout.subtitle_weight">
                                                    <h3 class="no-select">Weight</h3></label>
                                                <div id="setting-layout.subtitle_weight" name="layout.subtitle_weight" class="buttons-container">
                                                    <input type="radio" name="layout.subtitle_weight" value="bold" id="layout.subtitle_weight_0">
                                                    <label for="layout.subtitle_weight_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Bold</label>
                                                    <input type="radio" name="layout.subtitle_weight" value="normal" id="layout.subtitle_weight_1">
                                                    <label for="layout.subtitle_weight_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Regular</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color hidden width-quarter">
                                                <label for="setting-layout.subtitle_color">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-layout.subtitle_color" name="layout.subtitle_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.subtitle_line_height">
                                                    <h3 class="no-select">Line height</h3></label>
                                                <input id="setting-layout.subtitle_line_height" name="layout.subtitle_line_height" type="number" min="0" max="3" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-string hidden settings-buttons width-three-quarters">
                                                <label for="setting-layout.subtitle_space_above">
                                                    <h3 class="no-select">Space above</h3></label>
                                                <div id="setting-layout.subtitle_space_above" name="layout.subtitle_space_above" class="buttons-container">
                                                    <input type="radio" name="layout.subtitle_space_above" value="0" id="layout.subtitle_space_above_0">
                                                    <label for="layout.subtitle_space_above_0" style="width: 25%; border-radius: 3px 0px 0px 3px;">▁</label>
                                                    <input type="radio" name="layout.subtitle_space_above" value="0.5" id="layout.subtitle_space_above_1">
                                                    <label for="layout.subtitle_space_above_1" style="width: 25%;">▃</label>
                                                    <input type="radio" name="layout.subtitle_space_above" value="1" id="layout.subtitle_space_above_2">
                                                    <label for="layout.subtitle_space_above_2" style="width: 25%;">▄</label>
                                                    <input type="radio" name="layout.subtitle_space_above" value="custom" id="layout.subtitle_space_above_3">
                                                    <label for="layout.subtitle_space_above_3" style="width: 25%; border-radius: 0px 3px 3px 0px;">...</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.subtitle_space_above_custom">
                                                    <h3 class="no-select">Custom</h3></label>
                                                <input id="setting-layout.subtitle_space_above_custom" name="layout.subtitle_space_above_custom" type="number" min="0" max="100" step="0.05">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Text</h3>
                                            <div class="settings-option option-type-string width-three-quarters">
                                                <label for="setting-layout.text" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <input id="setting-layout.text" name="layout.text" type="text">
                                            </div>
                                            <div class="settings-option option-type-boolean width-quarter">
                                                <label for="setting-layout.text_styling">
                                                    <h3 class="no-select">Styling</h3></label>
                                                <input id="setting-layout.text_styling" name="layout.text_styling" type="checkbox">
                                                <label class="slider" for="setting-layout.text_styling"></label>
                                            </div>
                                            <div class="settings-option option-type-string hidden settings-buttons width-three-quarters">
                                                <label for="setting-layout.text_size">
                                                    <h3 class="no-select">Size</h3></label>
                                                <div id="setting-layout.text_size" name="layout.text_size" class="buttons-container">
                                                    <input type="radio" name="layout.text_size" value="1.2" id="layout.text_size_0">
                                                    <label for="layout.text_size_0" style="width: 25%; border-radius: 3px 0px 0px 3px;">ᴀ</label>
                                                    <input type="radio" name="layout.text_size" value="1.4" id="layout.text_size_1">
                                                    <label for="layout.text_size_1" style="width: 25%;">A</label>
                                                    <input type="radio" name="layout.text_size" value="1.6" id="layout.text_size_2">
                                                    <label for="layout.text_size_2" style="width: 25%;"><i class="fa fa-font"></i></label>
                                                    <input type="radio" name="layout.text_size" value="custom" id="layout.text_size_3">
                                                    <label for="layout.text_size_3" style="width: 25%; border-radius: 0px 3px 3px 0px;">...</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.text_size_custom">
                                                    <h3 class="no-select">Custom</h3></label>
                                                <input id="setting-layout.text_size_custom" name="layout.text_size_custom" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-string hidden settings-buttons width-half">
                                                <label for="setting-layout.text_weight">
                                                    <h3 class="no-select">Weight</h3></label>
                                                <div id="setting-layout.text_weight" name="layout.text_weight" class="buttons-container">
                                                    <input type="radio" name="layout.text_weight" value="bold" id="layout.text_weight_0">
                                                    <label for="layout.text_weight_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Bold</label>
                                                    <input type="radio" name="layout.text_weight" value="normal" id="layout.text_weight_1">
                                                    <label for="layout.text_weight_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Regular</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-color hidden width-quarter">
                                                <label for="setting-layout.text_color">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-layout.text_color" name="layout.text_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.text_line_height">
                                                    <h3 class="no-select">Line height</h3></label>
                                                <input id="setting-layout.text_line_height" name="layout.text_line_height" type="number" min="0" max="3" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-string hidden settings-buttons width-three-quarters">
                                                <label for="setting-layout.text_space_above">
                                                    <h3 class="no-select">Space above</h3></label>
                                                <div id="setting-layout.text_space_above" name="layout.text_space_above" class="buttons-container">
                                                    <input type="radio" name="layout.text_space_above" value="0" id="layout.text_space_above_0">
                                                    <label for="layout.text_space_above_0" style="width: 25%; border-radius: 3px 0px 0px 3px;">▁</label>
                                                    <input type="radio" name="layout.text_space_above" value="0.5" id="layout.text_space_above_1">
                                                    <label for="layout.text_space_above_1" style="width: 25%;">▃</label>
                                                    <input type="radio" name="layout.text_space_above" value="1" id="layout.text_space_above_2">
                                                    <label for="layout.text_space_above_2" style="width: 25%;">▄</label>
                                                    <input type="radio" name="layout.text_space_above" value="custom" id="layout.text_space_above_3">
                                                    <label for="layout.text_space_above_3" style="width: 25%; border-radius: 0px 3px 3px 0px;">...</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.text_space_above_custom">
                                                    <h3 class="no-select">Custom</h3></label>
                                                <input id="setting-layout.text_space_above_custom" name="layout.text_space_above_custom" type="number" min="0" max="100" step="0.05">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Border</h3>
                                            <div class="settings-option option-type-string width-quarter">
                                                <label for="setting-layout.header_border" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <input id="setting-layout.header_border" name="layout.header_border" type="text" data-autocomplete="layout.header_border-dropdown" autocomplete="off" data-value="none"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="layout.header_border-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number width-quarter hidden">
                                                <label for="setting-layout.header_border_width">
                                                    <h3 class="no-select">Width</h3></label>
                                                <input id="setting-layout.header_border_width" name="layout.header_border_width" type="number">
                                            </div>
                                            <div class="settings-option option-type-color width-quarter hidden">
                                                <label for="setting-layout.header_border_color">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-layout.header_border_color" name="layout.header_border_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string width-quarter hidden">
                                                <label for="setting-layout.header_border_style">
                                                    <h3 class="no-select">Style</h3></label>
                                                <input id="setting-layout.header_border_style" name="layout.header_border_style" type="text" data-autocomplete="layout.header_border_style-dropdown" autocomplete="off" data-value="solid"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="layout.header_border_style-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Logo/image</h3>
                                            <div class="settings-option option-type-boolean settings-buttons width-full">
                                                <label for="setting-layout.header_logo_enabled" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <div id="setting-layout.header_logo_enabled" name="layout.header_logo_enabled" class="buttons-container">
                                                    <input type="radio" name="layout.header_logo_enabled" value="true" id="layout.header_logo_enabled_0">
                                                    <label for="layout.header_logo_enabled_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Enabled</label>
                                                    <input type="radio" name="layout.header_logo_enabled" value="false" id="layout.header_logo_enabled_1">
                                                    <label for="layout.header_logo_enabled_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Disabled</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-url hidden width-three-quarters">
                                                <label for="setting-layout.header_logo_src">
                                                    <h3 class="no-select">URL</h3></label>
                                                <input id="setting-layout.header_logo_src" name="layout.header_logo_src" type="url">
                                                <button type="button" class="upload" title="Upload a file from your computer">⬆︎</button>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.header_logo_height">
                                                    <h3 class="no-select">Height</h3></label>
                                                <input id="setting-layout.header_logo_height" name="layout.header_logo_height" type="number" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-string hidden width-quarter">
                                                <label for="setting-layout.header_logo_align">
                                                    <h3 class="no-select">Align</h3></label>
                                                <input id="setting-layout.header_logo_align" name="layout.header_logo_align" type="text" data-autocomplete="layout.header_logo_align-dropdown" autocomplete="off" data-value="inside"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="layout.header_logo_align-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string hidden settings-buttons width-three-quarters">
                                                <label for="setting-layout.header_logo_position_inside">
                                                    <h3 class="no-select">Position</h3></label>
                                                <div id="setting-layout.header_logo_position_inside" name="layout.header_logo_position_inside" class="buttons-container">
                                                    <input type="radio" name="layout.header_logo_position_inside" value="top" id="layout.header_logo_position_inside_0">
                                                    <label for="layout.header_logo_position_inside_0" style="width: 33.3333%; border-radius: 3px 0px 0px 3px;">Top</label>
                                                    <input type="radio" name="layout.header_logo_position_inside" value="left" id="layout.header_logo_position_inside_1">
                                                    <label for="layout.header_logo_position_inside_1" style="width: 33.3333%;">Left</label>
                                                    <input type="radio" name="layout.header_logo_position_inside" value="right" id="layout.header_logo_position_inside_2">
                                                    <label for="layout.header_logo_position_inside_2" style="width: 33.3333%; border-radius: 0px 3px 3px 0px;">Right</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string hidden settings-buttons width-three-quarters">
                                                <label for="setting-layout.header_logo_position_outside">
                                                    <h3 class="no-select">Position</h3></label>
                                                <div id="setting-layout.header_logo_position_outside" name="layout.header_logo_position_outside" class="buttons-container">
                                                    <input type="radio" name="layout.header_logo_position_outside" value="left" id="layout.header_logo_position_outside_0">
                                                    <label for="layout.header_logo_position_outside_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Left</label>
                                                    <input type="radio" name="layout.header_logo_position_outside" value="right" id="layout.header_logo_position_outside_1">
                                                    <label for="layout.header_logo_position_outside_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Right</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.header_logo_margin_top">
                                                    <h3 class="no-select">Top</h3></label>
                                                <input id="setting-layout.header_logo_margin_top" name="layout.header_logo_margin_top" type="number" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.header_logo_margin_right">
                                                    <h3 class="no-select">Right</h3></label>
                                                <input id="setting-layout.header_logo_margin_right" name="layout.header_logo_margin_right" type="number" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.header_logo_margin_bottom">
                                                    <h3 class="no-select">Bottom</h3></label>
                                                <input id="setting-layout.header_logo_margin_bottom" name="layout.header_logo_margin_bottom" type="number" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.header_logo_margin_left">
                                                    <h3 class="no-select">Left</h3></label>
                                                <input id="setting-layout.header_logo_margin_left" name="layout.header_logo_margin_left" type="number" step="0.05">
                                            </div>
                                        </div>
                                        <div class="settings-block">
                                            <h2 class="no-select" tabindex="0"><i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>Footer</h2>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Sources</h3>
                                            <div class="settings-option option-type-string width-half">
                                                <label for="setting-layout.source_name">
                                                    <h3 class="no-select">Source name</h3></label>
                                                <input id="setting-layout.source_name" name="layout.source_name" type="text">
                                            </div>
<!--                                             <div class="settings-option option-type-string width-half">
                                                <label for="setting-layout.source_url">
                                                    <h3 class="no-select">Source url</h3></label>
                                                <input id="setting-layout.source_url" name="layout.source_url" type="text">
                                            </div> -->
                                            <!-- <div class="settings-option option-type-boolean">
                                                <label for="setting-layout.multiple_sources">
                                                    <h3 class="no-select">Multiple sources</h3></label>
                                                <input id="setting-layout.multiple_sources" name="layout.multiple_sources" type="checkbox">
                                                <label class="slider" for="setting-layout.multiple_sources"></label>
                                            </div>
                                            <div class="settings-option option-type-string hidden width-half">
                                                <label for="setting-layout.source_name_2">
                                                    <h3 class="no-select">Source name</h3></label>
                                                <input id="setting-layout.source_name_2" name="layout.source_name_2" type="text">
                                            </div>
                                            <div class="settings-option option-type-string hidden width-half">
                                                <label for="setting-layout.source_url_2">
                                                    <h3 class="no-select">Source url</h3></label>
                                                <input id="setting-layout.source_url_2" name="layout.source_url_2" type="text">
                                            </div>
                                            <div class="settings-option option-type-string hidden width-half">
                                                <label for="setting-layout.source_name_3">
                                                    <h3 class="no-select">Source name</h3></label>
                                                <input id="setting-layout.source_name_3" name="layout.source_name_3" type="text">
                                            </div>
                                            <div class="settings-option option-type-string hidden width-half">
                                                <label for="setting-layout.source_url_3">
                                                    <h3 class="no-select">Source url</h3></label>
                                                <input id="setting-layout.source_url_3" name="layout.source_url_3" type="text">
                                            </div>
                                            <div class="settings-option option-type-string width-half">
                                                <label for="setting-layout.source_label">
                                                    <h3 class="no-select">Source label</h3></label>
                                                <input id="setting-layout.source_label" name="layout.source_label" type="text">
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Notes</h3>
                                            <div class="settings-option option-type-string">
                                                <label for="setting-layout.footer_note">
                                                    <h3 class="no-select">Note</h3></label>
                                                <input id="setting-layout.footer_note" name="layout.footer_note" type="text">
                                            </div>
                                            <div class="settings-option option-type-number width-quarter">
                                                <label for="setting-layout.footer_text_size">
                                                    <h3 class="no-select">Size</h3></label>
                                                <input id="setting-layout.footer_text_size" name="layout.footer_text_size" type="number" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-color width-quarter">
                                                <label for="setting-layout.footer_text_color">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-layout.footer_text_color" name="layout.footer_text_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string settings-buttons width-half">
                                                <label for="setting-layout.footer_align">
                                                    <h3 class="no-select">Alignment</h3></label>
                                                <div id="setting-layout.footer_align" name="layout.footer_align" class="buttons-container">
                                                    <input type="radio" name="layout.footer_align" value="left" id="layout.footer_align_0">
                                                    <label for="layout.footer_align_0" style="width: 25%; border-radius: 3px 0px 0px 3px;"><i class="fa fa-align-left"></i></label>
                                                    <input type="radio" name="layout.footer_align" value="center" id="layout.footer_align_1">
                                                    <label for="layout.footer_align_1" style="width: 25%;"><i class="fa fa-align-center"></i></label>
                                                    <input type="radio" name="layout.footer_align" value="right" id="layout.footer_align_2">
                                                    <label for="layout.footer_align_2" style="width: 25%;"><i class="fa fa-align-right"></i></label>
                                                    <input type="radio" name="layout.footer_align" value="justify" id="layout.footer_align_3">
                                                    <label for="layout.footer_align_3" style="width: 25%; border-radius: 0px 3px 3px 0px;"><i class="fa fa-align-justify"></i></label>
                                                </div>
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Logo</h3>
                                            <div class="settings-option option-type-boolean settings-buttons width-full">
                                                <label for="setting-layout.footer_logo_enabled" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <div id="setting-layout.footer_logo_enabled" name="layout.footer_logo_enabled" class="buttons-container">
                                                    <input type="radio" name="layout.footer_logo_enabled" value="true" id="layout.footer_logo_enabled_0">
                                                    <label for="layout.footer_logo_enabled_0" style="width: 50%; border-radius: 3px 0px 0px 3px;">Enabled</label>
                                                    <input type="radio" name="layout.footer_logo_enabled" value="false" id="layout.footer_logo_enabled_1">
                                                    <label for="layout.footer_logo_enabled_1" style="width: 50%; border-radius: 0px 3px 3px 0px;">Disabled</label>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-url hidden width-half">
                                                <label for="setting-layout.footer_logo_src">
                                                    <h3 class="no-select">Image</h3></label>
                                                <input id="setting-layout.footer_logo_src" name="layout.footer_logo_src" type="url">
                                                <button type="button" class="upload" title="Upload a file from your computer">⬆︎</button>
                                            </div>
                                            <div class="settings-option option-type-string hidden width-half">
                                                <label for="setting-layout.footer_logo_link_url">
                                                    <h3 class="no-select">Link</h3></label>
                                                <input id="setting-layout.footer_logo_link_url" name="layout.footer_logo_link_url" type="text">
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.footer_logo_height">
                                                    <h3 class="no-select">Height</h3></label>
                                                <input id="setting-layout.footer_logo_height" name="layout.footer_logo_height" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-number hidden width-quarter">
                                                <label for="setting-layout.footer_logo_margin">
                                                    <h3 class="no-select">Margin</h3></label>
                                                <input id="setting-layout.footer_logo_margin" name="layout.footer_logo_margin" type="number" min="0" step="0.05">
                                            </div>
                                            <div class="settings-option option-type-string hidden width-quarter">
                                                <label for="setting-layout.footer_logo_order">
                                                    <h3 class="no-select">Position</h3></label>
                                                <input id="setting-layout.footer_logo_order" name="layout.footer_logo_order" type="text" data-autocomplete="layout.footer_logo_order-dropdown" autocomplete="off" data-value="right"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="layout.footer_logo_order-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string hidden width-quarter">
                                                <label for="setting-layout.footer_align_vertical">
                                                    <h3 class="no-select">V. align</h3></label>
                                                <input id="setting-layout.footer_align_vertical" name="layout.footer_align_vertical" type="text" data-autocomplete="layout.footer_align_vertical-dropdown" autocomplete="off" data-value="center"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="layout.footer_align_vertical-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-divider"></div>
                                            <h3 class="settings-subhead">Border</h3>
                                            <div class="settings-option option-type-string width-quarter">
                                                <label for="setting-layout.footer_border" class="hidden">
                                                    <h3 class="no-select"></h3></label>
                                                <input id="setting-layout.footer_border" name="layout.footer_border" type="text" data-autocomplete="layout.footer_border-dropdown" autocomplete="off" data-value="none"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="layout.footer_border-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-number width-quarter hidden">
                                                <label for="setting-layout.footer_border_width">
                                                    <h3 class="no-select">Width</h3></label>
                                                <input id="setting-layout.footer_border_width" name="layout.footer_border_width" type="number">
                                            </div>
                                            <div class="settings-option option-type-color width-quarter hidden">
                                                <label for="setting-layout.footer_border_color">
                                                    <h3 class="no-select">Color</h3></label>
                                                <div class="color-wrapper">
                                                    <input id="setting-layout.footer_border_color" name="layout.footer_border_color" type="color">
                                                </div>
                                            </div>
                                            <div class="settings-option option-type-string width-quarter hidden">
                                                <label for="setting-layout.footer_border_style">
                                                    <h3 class="no-select">Style</h3></label>
                                                <input id="setting-layout.footer_border_style" name="layout.footer_border_style" type="text" data-autocomplete="layout.footer_border_style-dropdown" autocomplete="off" data-value="solid"><i class="fa fa-chevron-down clickable"></i>
                                                <div class="dropdown autocomplete click-to-open" id="layout.footer_border_style-dropdown">
                                                    <div class="dropdown-list"></div>
                                                </div>
                                            </div> -->
                                        </div>
                                    </form>
                                    <div class="detailed-settings"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane tab-data">
                <div class="row data">
                    <div class="row-inner">
                        <div class="side-panel side-panel-data">
                            <div class="side-panel-inner">
                                <div class="data-bindings-intro">
                                    <h2>Select columns to visualise</h2>                                    
                                </div>
                                <div class="data-bindings">
                                    <div class="data-block open">
                                        <h2 class="no-select">Data</h2>
                                        <div class="datatable-selector-container">
                                            <select class="datatable-selector" data-index="0">
                                                <option data-id="2124498">Data</option>
                                                <option data-id="2124499">Captions</option>
                                            </select>
                                        </div>
                                        <div class="settings-option option-type-column">
                                            <h3>Label</h3><span class="required">REQUIRED</span>
                                            <input id="data-binding-data-label" name="data-label" data-value="A" type="text" style="background: rgb(255, 221, 231); border-color: rgb(244, 177, 197);">
                                            <p>A column containing the names of the bars, e.g. countries or people</p>
                                        </div>
                                        <div class="settings-option option-type-columns">
                                            <h3>Values</h3>
                                            <input id="data-binding-data-values" name="data-values" data-value="D-ZZ" type="text" style="background: rgb(208, 197, 229); border-color: rgb(150, 126, 198);">
                                            <p>Multiple columns of numbers, each column representing a point in time</p>
                                        </div>
                                        <div class="settings-option option-type-column">
                                            <h3>Categories</h3>
                                            <input id="data-binding-data-category" name="data-category" data-value="B" type="text" style="background: rgb(229, 197, 225); border-color: rgb(198, 126, 189);">
                                            <p>Optional category column to color the bars. Make sure the "Color mode" setting is set to "By Category" in the "Bar colors" settings panel</p>
                                        </div>
                                        <div class="settings-option option-type-column">
                                            <h3>Image</h3>
                                            <input id="data-binding-data-image" name="data-image" data-value="C" type="text" style="background: rgb(197, 205, 229); border-color: rgb(126, 145, 198);">
                                            <p>Optional column with URLs of images</p>
                                        </div>
                                    </div>
                                    <div class="data-block open">
                                        <h2 class="no-select">Captions</h2>
                                        <div class="datatable-selector-container">
                                            <select class="datatable-selector" data-index="5">
                                                <option data-id="2124498">Data</option>
                                                <option data-id="2124499">Captions</option>
                                            </select>
                                        </div>
                                        <div class="settings-option option-type-column">
                                            <h3>Time to show</h3>
                                            <input id="data-binding-captions-from" name="captions-from" data-value="A" type="text" style="background: rgb(197, 219, 229); border-color: rgb(126, 176, 198);">
                                            <p>Must match the column headers in the main data sheet</p>
                                        </div>
                                        <div class="settings-option option-type-column">
                                            <h3>Time to hide</h3>
                                            <input id="data-binding-captions-to" name="captions-to" data-value="B" type="text" style="background: rgb(197, 229, 210); border-color: rgb(126, 198, 155);">
                                            <p>Must match the column headers in the main data sheet</p>
                                        </div>
                                        <div class="settings-option option-type-column">
                                            <h3>Text</h3>
                                            <input id="data-binding-captions-text" name="captions-text" data-value="C" type="text" style="background: rgb(221, 229, 197); border-color: rgb(179, 198, 126);">
                                            <p>Text or HTML to show</p>
                                        </div>
                                        <div class="settings-option option-type-column">
                                            <h3>Image</h3>
                                            <input id="data-binding-captions-image" name="captions-image" data-value="D" type="text" style="background: rgb(229, 210, 197); border-color: rgb(198, 155, 126);">
                                            <p>Image to show</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="data-block open">
                                    <h2 class="no-select">Preview</h2>
                                    <div id="slide-preview-widget">
                                    </div>
                                </div>
                            </div>
                        </div>                        
                        <div class="row-content">
                            <div class="row-menus">
                                <div class="row-menu">
                                    <div class="btn-group sheet-tabs tabs">
                                        <div class="sheet-tab tab btn selected" id="sheet-tab-2124498" data-target="2124498"><span class="sheet-name" title="Data">Data</span><i class="fa fa-chevron-down show-sheet-options clickable hide"></i>
                                            <div class="sheet-options hide">
                                                <div class="sheet-option clickable"><i class="fa fa-download"></i><span class="option-name">Download data</span></div>
                                                <div class="sheet-option clickable"><i class="fa fa-eraser"></i><span class="option-name">Clear sheet</span></div>
                                                <div class="sheet-option clickable"><i class="fa fa-trash"></i><span class="option-name">Delete sheet</span></div>
                                            </div>
                                        </div>
                                        <div class="sheet-tab tab btn" id="sheet-tab-2124499" data-target="2124499"><span class="sheet-name" title="Captions">Captions</span><i class="fa fa-chevron-down show-sheet-options clickable hide"></i>
                                            <div class="sheet-options hide">
                                                <div class="sheet-option clickable"><i class="fa fa-download"></i><span class="option-name">Download data</span></div>
                                                <div class="sheet-option clickable"><i class="fa fa-eraser"></i><span class="option-name">Clear sheet</span></div>
                                                <div class="sheet-option clickable"><i class="fa fa-trash"></i><span class="option-name">Delete sheet</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="spreadsheet-container">
                                <div class="add-data-container" style="display: block;">
                                    <span class="dropdown-btn import-data">
										<span class="btn action" data-action="add-data"><i class="fa fa-upload"></i> Upload data file</span>
                                    </span>
                                    <form action="<?php echo $_SERVER["PHP_SELF"]; ?>" method="post" enctype="multipart/form-data" id="csvform">
                                        <input type="file" id="theDataFile" name="csvfile" style="display:none;" accept=".csv, .xlsx, .xls"/>
                                    </form>
                                </div>                                
                                <div id="spreadsheet">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/handsontable@7.4.0/dist/handsontable.full.min.js"></script>
    <!-- <script src="assets/js/xlsx.min.js"></script> -->
    <!-- <script src="assets/js/flourish.js"></script> -->
    <script src="assets/js/page-script.js"></script>
    <script src="assets/js/tmp_data.js"></script>
    <script src="assets/js/config.js"></script>
    <script src="assets/js/visual.js"></script> 
    <script>
    </script>
</body>

</html>