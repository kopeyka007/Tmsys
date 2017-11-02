<!--P A G E  T W O-->

<div class="wrapper">
	<div class="page-two">
		<div class="steps-box">
			<ul class="clearfix">
				<li class="active"><span>1</span></li>
				<li class="active"><span>2</span></li>
				<li><span>3</span></li>
				<li><span>4</span></li>
			</ul>
			<span class="caption-step-box text-center">wybierz typ deski</span>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<div class="main-box">
					    <div class="row">
					    	<div class="col-xs-12">
					    		<div class="choice-board">
									<div class="row">
										<div class="col-xs-6 text-right">
											<button type="button" class="choice-board-item" 
											data-ng-class="{active: deska == 'composite'}" 
											data-ng-click="typeDeska('composite')">Deska kompozytowa</button>
										</div>
										<div class="col-xs-6 text-left">
											<button type="button" class="choice-board-item" 
											data-ng-class="{active: deska == 'wooden'}" 
											data-ng-click="typeDeska('wooden')">Deska drewniana</button>
										</div>
									</div>
								</div>
					    	</div>
					    </div>
					    <div class="row">
					    	<div class="col-md-12">
					    		<div class="unit-size">
									<div class="unit-start" 
									data-ng-click="v.unitStart = ! v.unitStart"; 
									data-ng-show="v.unitStart">
										<div class="unit-start-content text-center">
											<span><span>+</span></span>
											<p>Wprowadź własne wymiary deski</p>
										</div>
									</div>
									<div class="unit-form text-center"
									data-ng-show="! v.unitStart">
										<form data-ng-init="initForm(formbBoardY0, formbBoardX, formSeam)" name="formBoard" novalidate>
											<div class="input-fiel form-group">
												<label class="active" for="board_y0">Długość, mm</label>
												<input type="number" class="validate" id="board_y0" name="formBoardLength" min="1" step="1" required 
												data-ng-model="formbBoardY0">
											</div>
											<div class="input-field form-group">
												<label class="active" for="board_x">Szerokość, mm</label>
												<input type="number" class="validate" id="board_x" name="formbBoardWidth" min="1" step="1" required 
												data-ng-model="formbBoardX">
											</div>
											<div class="input-field form-group">
												<label class="active" for="seam">Szew, mm</label>
												<input type="number" name="formBoardSeam" class="validate" id="seam" min="1" step="1" required 
												data-ng-model="formSeam">
											</div>
											<div class="input-field form-group">
												<label class="active" for="cena">Cena, pln</label>
												<input type="number" name="formBoardCena" class="validate" id="cena" min="1" step="0.01" required 
												data-ng-model="formCena">
											</div>
											<button type="submit" class="board-butt" 
											data-ng-click="boardParamForm(formbBoardY0, formbBoardX, formSeam, formCena); lastend(0); validationForm(); getArr();">Zatwerdź  >
											</button>
										</form>
									</div>
								</div>
					    	</div>
					    </div>
						<div class="row">
							<div class="col-xs-12">

								<!--CARUSEL START-->
								
								<div class="carusel-box">
									<div class="box-boards">
										<button type ="button" class="carusel-btn carusel-prev" 
										data-ng-click="prev(cardsList)">
											<img src="/storage/images/button-next.png" alt="prev">
										</button>
										<div class="carusel">
											<div class="carusel-item @{{ caruselClass[key] }}" 
											data-ng-repeat="(key, cardList) in cardsList track by $index">
												<div class="col-md-12">
													<div class="unit" 
													data-ng-click="v.unitStart = true; changeRoute('/step_three/', 'slide-left', cardList.id); boardParamsList(cardList); scroll(); lastend(0)">
														<div class="unit-row">
															<div class="unit-cell">
																<img src=" @{{ cardList.board_img }}" alt="deska tarasowa">
															</div>
															<div class="unit-cell">
																<div class="boards-repeat"
																data-ng-repeat="(i, boards) in cardsList[key].boards track by $index">
																	<p data-ng-bind-html="boards.name + ' ' + '<span>' + boards.width + ' ' + 'x' + ' ' + boards.height + ' ' + 'x' + ' ' + boards.thickness + '</span>' + ' ' + boards.unit + ' ' + boards.brand"></p>
																	<span class="price">
																		@{{ (boards.price + '').split('.')[0] }}
																		<sup> @{{ (boards.price + '').split('.')[1] }}</sup>
																	</span>
																</div>
															</div>
															<div class="unit-cell">
																<img src="@{{ cardList.terrace_img }}" alt="terasy">
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<button type ="button" class="carusel-btn carusel-next" 
										data-ng-click="next(cardsList);">
												<img src="/storage/images/button-prev.png" alt="next">
										</button>	
									</div>
								</div>

								<!--CARUSEL END-->

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!--E N D  P A G E  T W O-->