<div class="wrapper" data-ng-init="getParamBoards()">
	<div class="main-box main-box-outsider">
		<div class="cheking-board">
			<div class="cheking-board-img">
				<img src="{{ cardInfo.srcBoard }}" alt="deska tarasowa">
			</div>
			<div class="cheking-board-description">
				<p class="text-center" data-ng-bind-html="cardInfo.firstBoard"></p>
				<p class="text-center" data-ng-bind-html="cardInfo.secondBoard "></p>
			</div>
			<div class="cheking-board-price">
				<span class="price">
					{{ cardInfo.priceFirstBoard.split('.')[0] }}
					<sup>{{ cardInfo.priceFirstBoard.split('.')[1] }}</sup>
				</span>
				<span class="price">
					{{ cardInfo.priceSecondBoard.split('.')[0] }}
					<sup>{{ cardInfo.priceSecondBoard.split('.')[1] }}</sup>
				</span>
			</div>
			<div class="cheking-board-terasy">
				<img src="{{ cardInfo.srcTerrace }}" alt="terasy">
			</div>
		</div>
		<div class="main-box-outsider-bottom">
			<button type="button" class="back-page" data-ng-click="changeRoute('/step_two', 'slide-left'); lastend(1)">
				<img src="/assets/img/button-next.png" alt="back">
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
										<button type ="button" data-ng-click="prev(figures)" class="carusel-btn carusel-prev" data-ng-hide="true">
											<img src="assets/img/button-next.png" alt="prev">
										</button>
										<div class="carusel-figure">
											<div class="carusel-figure-item {{ caruselClass[key] }}"  data-ng-repeat="(key, figure) in figures">
												<div class="radio" data-ng-class="{'active': v.type == key}" data-ng-click="resetFormFigure()">
													<label for="{{ 'optionsRadios'+ key }}" class="label-type">
														<span>
															<img src="{{ figure.src }}" alt="figure">
														</span>
														<input  type="radio" name="optionsRadios" id="{{ 'optionsRadios'+ key }}" data-ng-model="v.type" value="{{ key }}" class="no-visible" required>
													</label>
												</div>
											</div>
										</div>
										<button type ="button" data-ng-click="next(figures)" class="carusel-btn carusel-next" data-ng-hide="true">
											<img src="assets/img/button-prev.png" alt="next">
										</button>
									</div>
									<!--CARUSEL END-->
								</div>
								<div class="col-xs-9">
									<div class="terrace-field">
										<div class="terrace-figure-wrapper">
											<div class="terrace-figure-full" data-ng-show="v.type == 0">
												<div class="figure-square figure-light" data-ng-class="{ active:borderFigureBottom, activeleft:borderFigureLeft }">
													<span class="figure-border border-a">a</span>
													<span class="figure-border border-b">b</span>
												</div>
											</div>
											<div class="terrace-figure-full" data-ng-show="v.type == 1">
												<div class="figure-sqtwo-1 figure-light" data-ng-class="{ active:borderFigureTwoTop, activeleft:borderFigureTwoLeft }">
													<span class="figure-border border-c">c</span>
													<span class="figure-border border-d">d</span>
												</div>
												<div class="figure-sqtwo-2 figure-light" data-ng-class="{ active:borderFigureBottom, activeleft:borderFigureLeft }">
													<span class="figure-border border-a">a</span>
													<span class="figure-border border-b">b</span>
												</div>
											</div>
											<div class="terrace-figure-full" data-ng-show="v.type == 2">
												<div class="figure-circle-1 figure-light">
													<span class="figure-border border-c">c</span>
													<span class="figure-border border-d">d</span>
													<span class="circle-radius" data-ng-class="{  activeFigure:borderFigureTwoLeft }"></span>
												</div>
												<div class="figure-circle-2 figure-light-top figure-light" data-ng-class="{ active:borderFigureBottom, activeleft:borderFigureLeft}">
													<span class="circle-width-inside" ng-class="{  activeFigure:borderFigureTwoTop }"></span>
													<span class="figure-border border-a">a</span>
													<span class="figure-border border-b">b</span>
												</div>
											</div>
											<div class="terrace-figure-full" data-ng-show="v.type == 3">
												<div class="figure-boot">
													<div class="figure-boot-1 figure-light" data-ng-class="{ active:borderFigureTwoTop, activeRight:trapezeRight}"></div>
													<div class="figure-boot-2 figure-light" data-ng-class="{ active:borderFigureBottom, activeright:borderFigureTwoLeft}"></div>
													<span class="figure-boot-left" data-ng-class="{  activeFigure:borderFigureLeft }"></span>
													<span class="figure-boot-top" data-ng-class="{  activeFigure:trapezeTop }"></span>
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
													<div class="input-field" data-ng-show="v.type <='2' ">
														<label class="active" for="terrace_x0">Strona A, m</label>
														<input 	type="number" data-ng-model="terraceInner.x[0]" name="terraceXA" class="validate" id="terrace_x0" data-ng-focus="borderFigureBottom = true" data-ng-blur="borderFigureBottom = false" min="0.01" step="0.01" placeholder="{{ borderFigureBottom ? '' : 0 }}" required>
													</div>
													<div class="input-field input-margin" data-ng-show="v.type =='3' ">
														<label class="active" for="terrace_y03">Strona A, m</label>
														<input 	type="number" data-ng-model="terraceInner.y[0]" class="validate" name="terraceYA"
																id="terrace_y03" data-ng-focus="borderFigureBottom = true" data-ng-blur="borderFigureBottom = false" min="0.01" step="0.01" placeholder="{{ borderFigureBottom ? '' : 0 }}" required>
													</div>
													<div class="input-field" data-ng-show="v.type <='2'">
														<label class="active" for="terrace_y0"> Strona B, m</label>
														<input 	type="number" data-ng-model="terraceInner.y[0]" name="terraceYB0" class="validate" id="terrace_y0" data-ng-focus="borderFigureLeft = true" data-ng-blur="borderFigureLeft=false" min="0.01" step="0.01" placeholder="{{ borderFigureLeft ? '' : 0 }}" required>
													</div>
													<div class="input-field" data-ng-show="v.type == '3'">
														<label class="active" for="terrace_y11"> Strona B, m</label>
														<input 	type="number" data-ng-model="terraceInner.y[1]" name="terraceYB1" class="validate" id="terrace_y11" data-ng-focus="borderFigureLeft = true" data-ng-blur="borderFigureLeft = false" min="0.01" step="0.01" placeholder="{{ borderFigureLeft ? '' : 0 }}" required>
													</div>
												</div>
												<div class="input-row clearfix">
													<div>
														<div class="input-field" data-ng-show="v.type == '1' || v.type == '2'">
															<label class="active" for="terrace_y1" data-ng-show="v.type == '1'"
															>Strona C, m </label>
															<label class="active" for="terrace_y1" data-ng-show="v.type == '2'">Promień C, m</label>
															<input 	type="number" data-ng-model="terraceInner.y[1]" class="validate" 
																	name="terraceYC1" id="terrace_y1" data-ng-focus="borderFigureTwoLeft = true" data-ng-blur="borderFigureTwoLeft = false" min="0.01" step="0.01" placeholder="{{ borderFigureTwoLeft ? '' : 0 }}" required>
														</div>
														<div class="input-field" data-ng-show="v.type == '3'">
															<label class="active" for="terrace_x00">Strona C, mm </label>
															<input 	type="number" data-ng-model="terraceInner.x[0]" name="terraceXC1" class="validate" id="terrace_x00" data-ng-focus="borderFigureTwoLeft = true" data-ng-blur="borderFigureTwoLeft = false" min="0.01" step="0.01" placeholder="{{ borderFigureTwoLeft ? '' : 0 }}" required>
														</div>
													</div>
													<div  data-ng-show="v.type == '1' || v.type == '2' || v.type == '3'">
														<div class="input-field">
															<label class="active" for="terrace_x1"> Strona D, m</label>
															<input 	type="number" data-ng-model="terraceInner.x[1]" class="validate" 
																	name="terraceXD1" id="terrace_x1" data-ng-focus="borderFigureTwoTop = true" data-ng-blur="borderFigureTwoTop = false" min="0.01" step="0.01" placeholder="{{ borderFigureTwoTop ? '' : 0 }}" required>
														</div>
													</div>
												</div>
												<div class="input-row clearfix">
													<div class="input-field form-group" data-ng-show="v.type == '3'">
														<label class="active" for="terrace_z1" data-ng-show="v.type == '3'">Z1, m</label>
														<input 	type="number" data-ng-model="terraceInner.z[1]" name="terraceZ1"
																class="validate" id="terrace_z1" data-ng-focus="trapezeRight = true" 
																data-ng-blur="trapezeRight = false" min="0.01" step="0.01" placeholder="{{ trapezeRight ? '' : 0 }}" required>
													</div>
													<div data-ng-show="v.type == '3'">														<div class="input-field form-group">
															<label class="active" for="terrace_z0" data-ng-show="v.type == '3'">Z0, m</label>
															<input 	type="number" data-ng-model="terraceInner.z[0]" name="terraceZ0" class="validate" id="terrace_z0" data-ng-focus="trapezeTop = true" data-ng-blur="trapezeTop = falsee" min="0.01" step="0.01" placeholder="{{ trapezeTop ? '' : 0 }}" required>
														</div>
													</div>
												</div>
												<div class="input-row">
													<button class="btn-calc text-center" type="submit" data-ng-click="validationForm();">Oblicz</button>
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
