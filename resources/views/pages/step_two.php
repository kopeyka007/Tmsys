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
											<button type="button" class="choice-board-item" data-ng-class="{active: deska == 'composite'}" data-ng-click="typeDeska('composite')">Deska kompozytowa</button>
										</div>
										<div class="col-xs-6 text-left">
											<button type="button" class="choice-board-item" data-ng-class="{active: deska == 'wooden'}" data-ng-click="typeDeska('wooden')">Deska drewniana</button>
										</div>
									</div>
								</div>
					    	</div>
					    </div>
					    <div class="row">
					    	<div class="col-md-12">
					    		<div class="unit-size">
									<div class="unit-start" data-ng-click="v.unitStart = ! v.unitStart" data-ng-show="v.unitStart">
										<div class="unit-start-content text-center">
											<span><span>+</span></span>
											<p>Wprowadź własne wymiary deski</p>
										</div>
									</div>
									<div class="unit-form text-center" data-ng-show="! v.unitStart">
										<form data-ng-init="initForm(formbBoardY0, formbBoardX, formSeam)" name="formBoard" novalidate>
											<div class="input-fiel form-group">
												<label class="active" for="board_y0">Długość, mm</label>
												<input  type="number" data-ng-model="formbBoardY0" class="validate" id="board_y0" name="formBoardLength" min="1" step="1" required>
											</div>
											<div class="input-field form-group">
												<label class="active" for="board_x">Szerokość, mm</label>
												<input  type="number" data-ng-model="formbBoardX" class="validate" id="board_x" name="formbBoardWidth" min="1" step="1" required>
											</div>
											<div class="input-field form-group">
												<label class="active" for="seam">Szew, mm</label>
												<input  type="number" data-ng-model="formSeam" name="formBoardSeam" class="validate" id="seam" min="1" step="1" required>
											</div>
											<div class="input-field form-group">
												<label class="active" for="cena">Cena, pln</label>
												<input  type="number" data-ng-model="formCena" name="formBoardCena" class="validate" id="cena" min="1" step="0.01" required>
											</div>
											<button type="submit" 
													data-ng-click="boardParamForm(formbBoardY0, formbBoardX, formSeam, formCena); lastend(0); validationForm(); getArr();" class="board-butt">Zatwierdź  >
											</button>
										</form>
									</div>
								</div>
					    	</div>
					    </div>
						<!--COMPOSITE-->
						<div class="row container-composite" data-ng-if="deska == 'composite'">
							<div class="col-xs-12">
								<!--CARUSEL START-->
								<div class="carusel-box">
									<div class="box-boards">
										<button type ="button" data-ng-click="prev(cardsList)" class="carusel-btn carusel-prev">
											<img src="/assets/img/button-next.png" alt="prev">
										</button>
										<div class="carusel">
											<div class="carusel-item {{ caruselClass[key] }}"  data-ng-repeat="(key, cardList) in cardsList track by $index">
												<div class="col-md-12">
													<div class="unit" data-ng-click="v.unitStart = true; changeRoute('/step_three/', 'slide-left', cardList.id); boardParamsList(cardList); scroll(); lastend(0)">
														<div class="unit-row">
															<div class="unit-cell">
																<img src="{{ cardList.board_img }}" alt="deska tarasowa">
															</div>

															<div class="unit-cell">
																{{ cardList.id }}
																<p data-ng-bind-html="cardList[key].boards[0].name + ' ' + '<span>' + cardList[key].boards[0].width + ' ' + 'x' + ' ' + cardList[key].boards[0].heigth + ' ' + 'x' + ' ' + cardList[key].boards[0].thickness + '</span>' + ' ' +  cardList[key].boards[0].unit + ' ' + cardList[key].boards[0].brand"></p>
																{{ cardList[key].boards[1].name }}
																<p ng-show="cardsList[key].boards[1].name" data-ng-bind-html="cardList[key].boards[1].name + ' ' + '<span>' + cardList[key].boards[0].width + ' ' + 'x' + ' ' + cardList[key].boards[0].heigth + ' ' + 'x' + ' ' + cardList[key].boards[0].thickness + '</span>' + ' ' +  cardList[key].boards[0].unit + ' ' + cardList[key].boards[0].brand"></p>
															</div>
															<div class="unit-cell">
																<span class="price">
																	{{ cardList.priceFirstBoard.split('.')[0] }}
																	<sup>{{ cardList.priceFirstBoard.split('.')[1] }}</sup>
																</span>
																<span class="price">
																	{{ cardList.priceSecondBoard.split('.')[0] }}
																	<sup>{{ cardList.priceSecondBoard.split('.')[1] }}</sup>
																</span>
															</div>

															<div class="unit-cell">
																<img src="{{ cardList.terrace_img }}" alt="terasy">
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<button type ="button" data-ng-click="next(cardsList);" class="carusel-btn carusel-next">
												<img src="/assets/img/button-prev.png" alt="next">
										</button>	
									</div>
								</div>
								<!--CARUSEL END-->
							</div>
						</div>
					    <!--WOODEN-->
						<div class="row container-wooden" data-ng-if="deska == 'wooden'">
							<div class="col-xs-12">
								<!--CARUSEL START-->
								<div class="carusel-box">
									<div class="box-boards">
										<button type ="button" data-ng-click="prev(cards)" class="carusel-btn carusel-prev">
											<img src="/assets/img/button-next.png" alt="prev">
										</button>
										<div class="carusel">
											<div class="carusel-item {{ caruselClass[key] }}"  data-ng-repeat="(key, cardList) in cardsList track by $index">
												{{ key}}
												<div class="col-md-12">
													<div class="unit" data-ng-click="v.unitStart = true; changeRoute('/step_three/', 'slide-left', cardList.id); boardParamsList(cardList); scroll(); lastend(0)">
														<div class="unit-row">
															<div class="unit-cell">
																<img src="{{ cardList.board_img }}" alt="deska tarasowa">
															</div>
															<div class="unit-cell">
																<p data-ng-bind-html="cardList.boards[0].name + ' ' + '<span>' + cardList.boards[0].width + ' ' + 'x' + ' ' + cardList.boards[0].heigth + ' ' + 'x' + ' ' + cardList.boards[0].thickness + '</span>' + ' ' +  cardList.boards[0].unit + ' ' + cardList.boards[0].brand"></p>
																<p ng-show="cardsList[key].boards[1].name" data-ng-bind-html="cardList.boards[1].name + ' ' + '<span>' + cardList.boards[1].width + ' ' + 'x' + ' ' + cardList.boards[1].heigth + ' ' + 'x' + ' ' + cardList.boards[1].thickness + '</span>' + ' ' +  cardList.boards[1].unit + ' ' + cardList.boards[1].brand"></p>
															</div>

															<div class="unit-cell">
																<img src="{{ cardList.terrace_img }}" alt="terasy">
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<button type ="button" data-ng-click="next(cardsList);" class="carusel-btn carusel-next">
												<img src="/assets/img/button-prev.png" alt="next">
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