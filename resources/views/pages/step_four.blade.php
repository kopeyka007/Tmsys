<div class="wrapper">
	<div class="wroc">
		<img src="/storage/images/wroc.png" alt="board" 
			data-ng-click="changeRoute('/', 'slide-left');">
	</div>
	<div class="page-four">
		<div class="steps-box">
			<ul class="clearfix">
				<li class="active"><span>1</span></li>
				<li class="active"><span>2</span></li>
				<li class="active"><span>3</span></li>
				<li class="active"><span>4</span></li>
			</ul>
			<span class="caption-step-box text-center">wybierz zestaw który ci najbardziej odpowaida</span>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="main-box">
						<div class="row">
							<div class="col-md-2">
								<div class="position-wrap">
									<div class="position-box">
										<div class="position-items" 
										data-ng-repeat="(key, board) in boardsCount" data-ng-hide="(key == 2 || key == 5) && ! cardInfo.paramSecondBoardY">
											<span class="position-box-caption" 
											data-ng-show="key === 0">UKŁAD PIONOWY</span>
											<span class="position-box-caption" 
											data-ng-show="key === 3">układ poziomy</span>
											<div class="position-items-box" 
											data-ng-class="{ active: isSet(key) }" data-ng-click="setTab(key);">
												<div class="position-iner">
													<span class="position-items-price">
														@{{ total[key].split('.')[0] }} 
														<sup>@{{ total[key].split('.')[1] }}</sup> PLN
													</span>
													<span class="position-items-param">@{{ cardInfo.paramFirstBoardY }} x @{{ cardInfo.paramFirstBoardX }} x @{{ cardInfo.thickFirstBoard }} mm</span>
													<span class="position-items-param" 
													data-ng-show="cardInfo.paramSecondBoardY > 0">@{{ cardInfo.paramSecondBoardY }} x @{{ cardInfo.paramSecondBoardX }} x @{{ cardInfo.thickSecondBoard }} mm</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-10">
								<div class="row" 
								ng-show="isSet(0)">
									<div class="col-md-7">
										<div class="additionaly">
											<div class="additionaly-wrap">
												<span class="additionaly-caption">zestawienie wszystkich materiałów</span>
												<div class="additionaly-box">
													<!--FIRST BOARD-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.priceFirstBoard.split('.')[0] }}</span>
															<sup>@{{ cardInfo.priceFirstBoard.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/storage/images/board.png" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ boardsCount[0][0] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.firstBoard"></span>
													</div>
													<!--END FIRST BOARD-->
													<!--TWO BOARD-->
													<div class="additionaly-row" 
													data-ng-show="board.y[1] != 0">
														<span class="price">
															<span>@{{ cardInfo.priceSecondBoard.split('.')[0] }}</span>
															<sup>@{{ cardInfo.priceSecondBoard.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/storage/images/board.png" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ boardsCount[0][1] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.secondBoard"></span>
													</div>
													<!--END TWO BOARD-->
													<!--ELEMENT-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.elementPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.elementPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/storage/images/element.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ element[0] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.element"></span>
													</div>
													<!--END ELEMENT-->
													<!--ZACISK-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.zaciskPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.zaciskPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/storage/images/zacisk.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ zacisk[0] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.zacisk"></span>
													</div>
													<!--END ZACISK-->
													<!--LEGAR-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.legarPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.legarPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/legar.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ legars[0] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.legar"></span>
													</div>
													<!--END LEGAR-->
												</div>
											</div>
											<div class="additionaly-sum">
												<span>suma</span>
												<span>@{{ total[0] }} PLN</span>
											</div>
										</div>
									</div>
									<div class="col-md-5">
										<div class="row">
											<div class="col-md-12">
												<span class="additionaly-caption text-center">Typ układu</span>
												<div class="wrap-ter">
													<img src="/assets/img/Cegelka2.png" alt="terrace">
												</div>
												<button type="button" class="btn-main text-center" 
												data-toggle="modal" data-target="#myModal" data-ng-click="calculate()">Pokaż rysunek techniczny</button>
											</div>
										</div>
									</div>
								</div>
								<div class="row" 
								ng-show="isSet(1)">
									<div class="col-md-7">
										<div class="additionaly">
											<div class="additionaly-wrap">
												<span class="additionaly-caption">zestawienie wszystkich materiałów</span>
												<div class="additionaly-box">
													<!--FIRST BOARD-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.priceFirstBoard.split('.')[0] }}</span>
															<sup>@{{ cardInfo.priceFirstBoard.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/board.png" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ boardsCount[1][0] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.firstBoard"></span>
													</div>
													<!--END FIRST BOARD-->
													<!--SECOND BOARD-->
													<div class="additionaly-row" 
													data-ng-show="board.y[1] != 0">
														<span class="price">
															<span>@{{ cardInfo.priceSecondBoard.split('.')[0] }}</span>
															<sup>@{{ cardInfo.priceSecondBoard.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/board.png" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ boardsCount[1][1] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.secondBoard"></span>
													</div>
													<!--END SECOND BOARD-->
													<!--ELEMENT-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.elementPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.elementPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/element.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ element[1] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.element"></span>
													</div>
													<!--END ELEMENT-->
													<!--ZACISK-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.zaciskPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.zaciskPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/zacisk.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ zacisk[1] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.zacisk"></span>
													</div>
													<!--END ZACISK-->
													<!--LEGAR-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.legarPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.legarPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/legar.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ legars[1] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.legar"></span>
													</div>
													<!--END LEGAR-->
												</div>
											</div>
											<div class="additionaly-sum">
												<span>suma</span>
												<span>@{{ total[1] }} PLN</span>
											</div>
										</div>
									</div>
									<div class="col-md-5">
										<div class="row">
											<div class="col-md-12">
												<span class="additionaly-caption text-center">Typ układu</span>
												<div class="wrap-ter">
													<img src="/assets/img/Cegelka.png" alt="terrace">
												</div>
												<button type="button" class="btn-main text-center" 
												data-toggle="modal" data-target="#myModal" data-ng-click="calculate()">Pokaż rysunek techniczny</button>
											</div>
										</div>
									</div>
								</div>
								<div class="row" 
								data-ng-show="isSet(2)">
									<div class="col-md-7">
										<div class="additionaly">
											<div class="additionaly-wrap">
												<span class="additionaly-caption">zestawienie wszystkich materiałów</span>
												<div class="additionaly-box">
													<!--FIRST BOARD-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.priceFirstBoard.split('.')[0] }}</span>
															<sup>@{{ cardInfo.priceFirstBoard.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/board.png" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ boardsCount[2][0] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.firstBoard"></span>
													</div>
													<!--END FIRST BOARD-->
													<!--SECOND BOARD-->
													<div class="additionaly-row" 
													data-ng-show="board.y[1] != 0">
														<span class="price">
															<span>@{{ cardInfo.priceSecondBoard.split('.')[0] }}</span>
															<sup>@{{ cardInfo.priceSecondBoard.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/board.png" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ boardsCount[2][1] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.secondBoard"></span>
													</div>
													<!--END SECOND BOARD-->
													<!--ELEMENT-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.elementPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.elementPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/element.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ element[2] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.element"></span>
													</div>
													<!--END ELEMENT-->
													<!--ZACISK-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.zaciskPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.zaciskPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/zacisk.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ zacisk[2] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.zacisk"></span>
													</div>
													<!--END ZACISK-->
													<!--LEGAR-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.legarPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.legarPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/legar.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ legars[2] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.legar"></span>
													</div>
													<!--END LEGAR-->
												</div>
											</div>
											<div class="additionaly-sum">
												<span>suma</span>
												<span>@{{ total[2] }} PLN</span>
											</div>
										</div>
									</div>
									<div class="col-md-5">
										<div class="row">
											<div class="col-md-12">
												<span class="additionaly-caption text-center">Typ układu</span>
												<div class="wrap-ter">
													<img src="/assets/img/Cegelka.png" alt="terrace">
												</div>
												<button type="button" class="btn-main text-center" 
												data-toggle="modal" data-target="#myModal"  data-ng-click="calculate()">Pokaż rysunek technicznyz</button>
											</div>
										</div>
									</div>
								</div>
								<div class="row" 
								ng-show="isSet(3)">
									<div class="col-md-7">
										<div class="additionaly">
											<div class="additionaly-wrap">
												<span class="additionaly-caption">zestawienie wszystkich materiałów</span>
												<div class="additionaly-box">
													<!--FIRST BOARD-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.priceFirstBoard.split('.')[0] }}</span>
															<sup>@{{ cardInfo.priceFirstBoard.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/board.png" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ boardsCount[3][0] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.firstBoard"></span>
													</div>
													<!--END FIRST BOARD-->
													<!--SECOND BOARD-->
													<div class="additionaly-row" 
													data-ng-show="board.y[1] != 0">
														<span class="price">
															<span>@{{ cardInfo.priceSecondBoard.split('.')[0] }}</span>
															<sup>@{{ cardInfo.priceSecondBoard.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/board.png" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ boardsCount[3][1] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.secondBoard"></span>
													</div>
													<!--END SECOND BOARD-->
													<!--ELEMENT-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.elementPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.elementPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/element.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ element[3] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.element"></span>
													</div>
													<!--END ELEMENT-->
													<!--ZACISK-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.zaciskPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.zaciskPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/zacisk.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ zacisk[3] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.zacisk"></span>
													</div>
													<!--END ZACISK-->
													<!--LEGAR-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.legarPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.legarPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/legar.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ legars[3] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.legar"></span>
													</div>
													<!--END LEGAR-->
												</div>
											</div>
											<div class="additionaly-sum">
												<span>suma</span>
												<span>@{{ total[3] }} PLN</span>
											</div>
										</div>
									</div>
									<div class="col-md-5">
										<div class="row">
											<div class="col-md-12">
												<span class="additionaly-caption text-center">Typ układu</span>
												<div class="wrap-ter">
													<img src="/assets/img/Cegelka2.png" alt="terrace" class="hor-board">
												</div>
												<button type="button" class="btn-main text-center" 
												data-toggle="modal" data-target="#myModal" data-ng-click="calculate()">Pokaż rysunek techniczny</button>
											</div>
										</div>
									</div>
								</div>
								<div class="row" 
								ng-show="isSet(4)">
									<div class="col-md-7">
										<div class="additionaly">
											<div class="additionaly-wrap">
												<span class="additionaly-caption">zestawienie wszystkich materiałów</span>
												<div class="additionaly-box">
													<!--FIRST BOARD-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.priceFirstBoard.split('.')[0] }}</span>
															<sup>@{{ cardInfo.priceFirstBoard.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/board.png" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ boardsCount[4][0] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.firstBoard"></span>
													</div>
													<!--END FIRST BOARD-->
													<!--SECOND BOARD-->
													<div class="additionaly-row" 
													data-ng-show="board.y[1] != 0">
														<span class="price">
															<span>@{{ cardInfo.priceSecondBoard.split('.')[0] }}</span>
															<sup>@{{ cardInfo.priceSecondBoard.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/board.png" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ boardsCount[4][1] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.secondBoard"></span>
													</div>
													<!--END SECOND BOARD-->
													<!--ELEMENT-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.elementPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.elementPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/element.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ element[4] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.element"></span>
													</div>
													<!--END ELEMENT-->
													<!--ZACISK-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.zaciskPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.zaciskPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/zacisk.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ zacisk[4] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.zacisk"></span>
													</div>
													<!--END ZACISK-->
													<!--LEGAR-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.legarPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.legarPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/legar.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ legars[4] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.legar"></span>
													</div>
													<!--END LEGAR-->
												</div>
											</div>
											<div class="additionaly-sum">
												<span>suma</span>
												<span>@{{ total[4] }} PLN</span>
											</div>
										</div>
									</div>
									<div class="col-md-5">
										<div class="row">
											<div class="col-md-12">
												<span class="additionaly-caption text-center">Typ układu</span>
												<div class="wrap-ter">
													<img src="/assets/img/Cegelka.png" alt="terrace" class="hor-board">
												</div>
												<button type="button" class="btn-main text-center" 
												data-toggle="modal" data-target="#myModal" data-ng-click="calculate()">Pokaż rysunek techniczny</button>
											</div>
										</div>
									</div>
								</div>
								<div class="row" ng-show="isSet(5)">
									<div class="col-md-7">
										<div class="additionaly">
											<div class="additionaly-wrap">
												<span class="additionaly-caption">zestawienie wszystkich materiałów</span>
												<div class="additionaly-box">
													<!--FIRST BOARD-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.priceFirstBoard.split('.')[0] }}</span>
															<sup>@{{ cardInfo.priceFirstBoard.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/board.png" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ boardsCount[5][0] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.firstBoard"></span>
													</div>
													<!--END FIRST BOARD-->
													<!--SECOND BOARD-->
													<div class="additionaly-row" 
													data-ng-show="board.y[1] != 0">
														<span class="price">
															<span>@{{ cardInfo.priceSecondBoard.split('.')[0] }}</span>
															<sup>@{{ cardInfo.priceSecondBoard.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/board.png" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ boardsCount[5][1] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.secondBoard"></span>
													</div>
													<!--END SECOND BOARD-->
													<!--ELEMENT-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.elementPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.elementPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/element.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ element[5] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.element"></span>
													</div>
													<!--END ELEMENT-->
													<!--ZACISK-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.zaciskPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.zaciskPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/zacisk.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ zacisk[5] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.zacisk"></span>
													</div>
													<!--END ZACISK-->
													<!--LEGAR-->
													<div class="additionaly-row">
														<span class="price">
															<span>@{{ cardInfo.legarPrice.split('.')[0] }}</span>
															<sup>@{{ cardInfo.legarPrice.split('.')[1] }}</sup>
															<span>/szt.</span>
														</span>
														<span>
															<img src="/assets/img/legar.jpg" alt="board">
														</span>
														<span class="quantity-board">
															<span> x </span>
															<span> @{{ legars[5] }} </span> 
															<span> szt </span>
														</span>
														<span class="descriptionB" 
														data-ng-bind-html="cardInfo.legar"></span>
													</div>
													<!--END LEGAR-->
												</div>
											</div>
											<div class="additionaly-sum">
												<span>suma</span>
												<span>@{{ total[5] }} PLN</span>
											</div>
										</div>
									</div>
									<div class="col-md-5">
										<div class="row">
											<div class="col-md-12">
												<span class="additionaly-caption text-center">Typ układu</span>
												<div class="wrap-ter">
													<img src="/assets/img/Cegelka.png" alt="terrace" class="hor-board">
												</div>
												<button type="button" class="btn-main text-center" 
												data-toggle="modal" data-target="#myModal" data-ng-click="calculate()">Pokaż rysunek techniczny</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="additionaly-form">
							<form class="form-send">
								<div>
									<label for="email-send">Wyślij na swój email <br> dokładne zestawienie</label>
									<input type="email" id="email-send" required placeholder="Email adres" 
									data-ng-model="v.email">
								</div>
								<button type="submit" class="btn-main text-center" 
								data-ng-click="sendMail()">Wyślij</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Modal results -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  	<div class="modal-dialog">
	    <div class="modal-content">
	      	<div class="modal-body">
	        	<div class="row">
				    <div class="results-box">
		              	<button type="button" class="close" data-dismiss="modal" aria-hidden="true" 
		              	data-ng-click="close('Cancel')">&times;</button>
		              	<div class="col-lg-2">
		              		<div class="results-terrace-description">
		              			<p class="descriptionB">deska cała</p> 
		              				<span class="color-box brown"></span>
		              			<p class="descriptionB">deska docięta</p> 	
		              				<span class="color-box brown-light"></span>
		              			<p class="descriptionB" 
		              			data-ng-show="board.y[1] != 0">deska cała 2</p>
		              				<span class="color-box two" 
		              				data-ng-show="board.y[1] != 0"></span>
		              		</div>
		              	</div>
		              	<div class="col-lg-10">
							<div class="results-terrace" 
							data-ng-show="isSet(0)">
								<div class="canvas canvas0"></div>
							</div>
							<div class="results-terrace" 
							data-ng-show="isSet(1)">
								<div class="canvas canvas1"></div>
							</div>
							<div class="results-terrace" 
							data-ng-show="isSet(2)">
								<div class="canvas canvas2"></div>
							</div>
							<div class="results-terrace" 
							data-ng-show="isSet(3)">
								<div class="canvas canvas3"></div>
							</div>
							<div class="results-terrace" 
							data-ng-show="isSet(4)">
								<div class="canvas canvas4"></div>
							</div>
							<div class="results-terrace" 
							data-ng-show="isSet(5)">
								<div class="canvas canvas5"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
	    </div>
	</div>
</div>
