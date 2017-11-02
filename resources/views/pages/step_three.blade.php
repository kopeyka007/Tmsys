<div class="wrapper">
	<div class="main-box main-box-outsider">
		<div class="cheking-board">
			<div class="cheking-board-img">
				<img src="@{{ cardInfo.board_img }}" alt="deska tarasowa">
			</div>
			<div class="boards-repeat"
			data-ng-repeat="(i, boards) in cardInfo.boards">
				<div class="cheking-board-description">
					<p class="text-center"
					data-ng-bind-html="boards.name + ' ' + '<span>' + boards.width + ' ' + 'x' + ' ' + boards.height + ' ' + 'x' + ' ' + boards.thickness + '</span>' + ' ' + boards.unit + ' ' + boards.brand"></p>
				</div>
				<div class="cheking-board-price">
					<span class="price">
						@{{ (boards.price + '').split('.')[0] }}
						<sup>@{{ (boards.price + '').split('.')[1] }}</sup>
					</span>
				</div>
			</div>
			<div class="cheking-board-terasy">
				<img src="@{{ cardInfo.terrace_img }}" alt="terasy">
			</div>
		</div>
		<div class="main-box-outsider-bottom">
			<button type="button" class="back-page" 
			data-ng-click="changeRoute('/step_two', 'slide-left'); lastend(1)">
				<img src="/storage/images/button-next.png" alt="back">
				<span>Wybierz inną dęskę</span>
			</button>
		</div>
	</div>
	<div class="page-three">
		<div class="steps-box">
			<ul class="clearfix">
				<li class="active"><span>1</span></li>
				<li class="active"><span>2</span></li>
				<li class="active"><span>3</span></li>
				<li><span>4</span></li>
			</ul>
			<span class="caption-step-box">podaj kształt i wymiary tarasu</span>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-xs-offset-2 col-xs-10">
					<div class="main-box">
						<div class="box-terrace">
							<div class="row">
								<div class="col-xs-3">

									<!--CARUSEL START-->
									
									<div class="carusel-figure-wrapper">
										<button type ="button" class="carusel-btn carusel-prev" 
										data-ng-click="prev(figures)" 
										data-ng-hide="true">
											<img src="/storage/images/button-next.png" alt="prev">
										</button>
										<div class="carusel-figure">
											<div class="carusel-figure-item @{{ caruselClass[key] }}" 
											data-ng-repeat="(key, figure) in figures">
												<div class="radio" 
												data-ng-class="{'active': v.type == key}" data-ng-click="resetFormFigure()">
													<label for="@{{ 'optionsRadios'+ key }}" class="label-type">
														<span>
															<img src="@{{ figure.src }}" alt="figure">
														</span>
														<input  type="radio" name="optionsRadios" id="@{{ 'optionsRadios'+ key }}" class="no-visible" required
														data-ng-model="v.type" value="@{{ key }}">
													</label>
												</div>
											</div>
										</div>
										<button type ="button" class="carusel-btn carusel-next" 
										data-ng-click="next(figures)" data-ng-hide="true">
											<img src="/storage/images/button-prev.png" alt="next">
										</button>
									</div>

									<!--CARUSEL END-->

								</div>
								<div class="col-xs-9">
									<div class="terrace-field">
										<div class="terrace-figure-wrapper">
											<div class="terrace-figure-full" 
											data-ng-show="v.type == 0">
												<div class="figure-square figure-light" 
												data-ng-class="{ active:borderFigureBottom, activeleft:borderFigureLeft }">
													<span class="figure-border border-a">a</span>
													<span class="figure-border border-b">b</span>
												</div>
											</div>
											<div class="terrace-figure-full" 
											data-ng-show="v.type == 1">
												<div class="figure-sqtwo-1 figure-light" 
												data-ng-class="{ active:borderFigureTwoTop, activeleft:borderFigureTwoLeft }">
													<span class="figure-border border-c">c</span>
													<span class="figure-border border-d">d</span>
												</div>
												<div class="figure-sqtwo-2 figure-light" 
												data-ng-class="{ active:borderFigureBottom, activeleft:borderFigureLeft }">
													<span class="figure-border border-a">a</span>
													<span class="figure-border border-b">b</span>
												</div>
											</div>
											<div class="terrace-figure-full" 
											data-ng-show="v.type == 2">
												<div class="figure-circle-1 figure-light">
													<span class="figure-border border-c">c</span>
													<span class="figure-border border-d">d</span>
													<span class="circle-radius" 
													data-ng-class="{  activeFigure:borderFigureTwoLeft }"></span>
												</div>
												<div class="figure-circle-2 figure-light-top figure-light" 
												data-ng-class="{ active:borderFigureBottom, activeleft:borderFigureLeft}">
													<span class="circle-width-inside" 
													ng-class="{  activeFigure:borderFigureTwoTop }"></span>
													<span class="figure-border border-a">a</span>
													<span class="figure-border border-b">b</span>
												</div>
											</div>
											<div class="terrace-figure-full" 
											data-ng-show="v.type == 3">
												<div class="figure-boot">
													<div class="figure-boot-1 figure-light" 
													data-ng-class="{ active:borderFigureTwoTop, activeRight:trapezeRight}"></div>
													<div class="figure-boot-2 figure-light" 
													data-ng-class="{ active:borderFigureBottom, activeright:borderFigureTwoLeft}"></div>
													<span class="figure-boot-left" 
													data-ng-class="{  activeFigure:borderFigureLeft }"></span>
													<span class="figure-boot-top" 
													data-ng-class="{  activeFigure:trapezeTop }"></span>
													<span class="figure-border border-a">a</span>
													<span class="figure-border border-b">b</span>
													<span class="figure-border border-z1">z1</span>
													<span class="figure-border border-c">c</span>
													<span class="figure-border border-d">d</span>
													<span class="figure-border border-z0">z0</span>
												</div>
											</div>
										</div>
										<div class="terrace-size">
											<form  name="terraceSize" novalidate="novalidate">
												<div class="input-row clearfix">
													<div class="input-field" 
													data-ng-show="v.type <='2' ">
														<label class="active" for="terrace_x0">Strona A, m</label>
														<input type="number" name="terraceXA" class="validate" id="terrace_x0" min="0.01" step="0.01" required data-ng-model="terraceInner.x[0]" data-ng-focus="borderFigureBottom = true" data-ng-blur="borderFigureBottom = false" placeholder="@{{ borderFigureBottom ? '' : 0 }}">
													</div>
													<div class="input-field input-margin" 
													data-ng-show="v.type =='3' ">
														<label class="active" for="terrace_y03">Strona A, m</label>
														<input type="number" class="validate" name="terraceYA" min="0.01" step="0.01" id="terrace_y03" required data-ng-model="terraceInner.y[0]" data-ng-focus="borderFigureBottom = true" data-ng-blur="borderFigureBottom = false" placeholder="@{{ borderFigureBottom ? '' : 0 }}">
													</div>
													<div class="input-field" 
													data-ng-show="v.type <='2'">
														<label class="active" for="terrace_y0"> Strona B, m</label>
														<input type="number" min="0.01" step="0.01" name="terraceYB0" class="validate" id="terrace_y0" data-ng-model="terraceInner.y[0]" required data-ng-focus="borderFigureLeft = true" data-ng-blur="borderFigureLeft=false"  placeholder="@{{ borderFigureLeft ? '' : 0 }}">
													</div>
													<div class="input-field" 
													data-ng-show="v.type == '3'">
														<label class="active" for="terrace_y11"> Strona B, m</label>
														<input type="number" name="terraceYB1" class="validate" id="terrace_y11" min="0.01" step="0.01" required data-ng-model="terraceInner.y[1]" data-ng-focus="borderFigureLeft = true" data-ng-blur="borderFigureLeft = false" placeholder="@{{ borderFigureLeft ? '' : 0 }}">
													</div>
												</div>
												<div class="input-row clearfix">
													<div>
														<div class="input-field" 
														data-ng-show="v.type == '1' || v.type == '2'">
															<label class="active" for="terrace_y1" 
															data-ng-show="v.type == '1'"
															>Strona C, m </label>
															<label class="active" for="terrace_y1" 
															data-ng-show="v.type == '2'">Promień C, m</label>
															<input 	type="number" class="validate" min="0.01" step="0.01" required name="terraceYC1" id="terrace_y1" data-ng-model="terraceInner.y[1]" data-ng-focus="borderFigureTwoLeft = true" data-ng-blur="borderFigureTwoLeft = false" placeholder="@{{ borderFigureTwoLeft ? '' : 0 }}">
														</div>
														<div class="input-field" 
														data-ng-show="v.type == '3'">
															<label class="active" for="terrace_x00">Strona C, mm </label>
															<input type="number" name="terraceXC1" class="validate" id="terrace_x00" min="0.01" step="0.01" required data-ng-model="terraceInner.x[0]" data-ng-focus="borderFigureTwoLeft = true" data-ng-blur="borderFigureTwoLeft = false"  placeholder="@{{ borderFigureTwoLeft ? '' : 0 }}">
														</div>
													</div>
													<div data-ng-show="v.type == '1' || v.type == '2' || v.type == '3'">
														<div class="input-field">
															<label class="active" for="terrace_x1"> Strona D, m</label>
															<input type="number" data-ng-model="terraceInner.x[1]" class="validate" name="terraceXD1" id="terrace_x1" min="0.01" step="0.01" required data-ng-focus="borderFigureTwoTop = true" data-ng-blur="borderFigureTwoTop = false" placeholder="@{{ borderFigureTwoTop ? '' : 0 }}">
														</div>
													</div>
												</div>
												<div class="input-row clearfix">
													<div class="input-field form-group" 
													data-ng-show="v.type == '3'">
														<label class="active" for="terrace_z1" 
														data-ng-show="v.type == '3'">Z1, m</label>
														<input 	type="number" class="validate" id="terrace_z1" name="terraceZ1" min="0.01" step="0.01" required data-ng-focus="trapezeRight = true" data-ng-model="terraceInner.z[1]" data-ng-blur="trapezeRight = false"  placeholder="@{{ trapezeRight ? '' : 0 }}" >
													</div>
													<div data-ng-show="v.type == '3'">
													<div class="input-field form-group">
															<label class="active" for="terrace_z0" 
															data-ng-show="v.type == '3'">Z0, m</label>
															<input 	type="number" name="terraceZ0" class="validate" id="terrace_z0" min="0.01" step="0.01" required data-ng-model="terraceInner.z[0]"  data-ng-focus="trapezeTop = true" data-ng-blur="trapezeTop = falsee" placeholder="@{{ trapezeTop ? '' : 0 }}" >
														</div>
													</div>
												</div>
												<div class="input-row">
													<button class="btn-calc text-center" type="submit" 
													data-ng-click="validationForm();">Oblicz</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>		
