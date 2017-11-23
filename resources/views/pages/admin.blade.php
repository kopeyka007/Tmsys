<div class="container">
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-success">
		      	<div class="panel-heading">Section add boards</div>
		      	<div class="panel-body text-right">
		      		<button type="button" class="btn btn-info" data-toggle="modal" data-target="#addBoards">+Add board</button>
		      		<button type="button" class="btn btn-danger"
					ng-click="signout()">Out</button>
		      	</div>
		    </div>
		    <div class="panel panel-success">
		      	<div class="panel-heading">All boards</div>
		      	<div class="panel-body text-right">
		      		<table class="table table_caption">
		      			<tr>
							<th></th>
							<th>Nazwa</th>
							<th>Długość, mm</th>
							<th>Szerokość, mm</th>
							<th>Szew, mm</th>
							<th>Typ</th>
							<th>Cena PLN</th>
							<th>Terasy</th>
						</tr>
		      		</table>
					<table class="table table_admin" 
					data-ng-repeat="(key, cardList) in cardsList track by $index">
						<tr>
							<td>
								<img src=" @{{ cardList.board_img }}" alt="deska tarasowa">
							</td>
							<td>
								<table class="table"
								data-ng-repeat="(i, boards) in cardsList[key].boards track by $index">
									<tr>
										<td>
											@{{ boards.name }}
										</td>
										<td>
											@{{ boards.height }}
										</td>
										<td>
											@{{ boards.width }}
										</td>
										<td>
											@{{ boards.thickness }}
										</td>
										<td>
											@{{ boards.type }}
										</td>
										<td>
											<span class="price">
												@{{ (boards.price + '').split('.')[0] }}
												<sup> @{{ (boards.price + '').split('.')[1] }}</sup>
											</span>
										</td>
									</tr>
								</table>
							</td>
							<td>
								<img src="@{{ cardList.terrace_img }}" alt="terasy">
							</td>
						</tr>
					</table>
		      	</div>
		    </div>
		</div>
	</div>
</div>

<!-- MODAL ADD BOARDS -->
<div id="addBoards" class="modal fade" role="dialog">
  	<div class="modal-dialog">
	    <div class="modal-content">
	      	<div class="modal-header">
	        	<button type="button" class="close" data-dismiss="modal"
	        	data-ng-click="resetForm()">&times;</button>
	        	<h4 class="modal-title">ADDING BOARDS SET</h4>
	      	</div>
	      	<div class="modal-body">
	        	<form name="addBoard" novalidate="novalidate">
	        		<div class="row">
	        			<div class="col-md-12">
	        				<div class="panel panel-info">
							  	<div class="panel-heading">ADD IMAGE</div>
							  	<div class="panel-body">
							  		<div class="row">
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.terrace_img.$touched && addBoard.terrace_img.$invalid || addBoard.$submitted && addBoard.terrace_img.$invalid, 'has-success' : addBoard.terrace_img.$touched && addBoard.terrace_img.$valid}">
					        					<div>
					        						<button type="button" class="btn btn-success" required name="terrace_img"
										        	data-ngf-select data-ng-model="terrace_img"  data-ngf-pattern="'image/*'" data-ngf-accept="'image/*'">Zdjęcie tarasów</button>
					        					</div>
					        					<div class="img-thumb">
					        						<span class="close" 
					        						ng-show="terrace_img" ng-click="terrace_img = ''">x</span>
					        						<img ngf-src="terrace_img">
					        					</div>
										    </div>
					        			</div>
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.board_img.$touched && addBoard.board_img.$invalid || addBoard.$submitted && addBoard.board_img.$invalid, 'has-success' : addBoard.board_img.$touched && addBoard.board_img.$valid}">
										        <div>
										        	<button type="button" class="btn btn-success" required name="board_img" 
										        	data-ngf-select data-ng-model="board_img"  data-ngf-pattern="'image/*'" data-ngf-accept="'image/*'">Zdjęcie deski</button>
										        </div>
										        <div class="img-thumb">
										        	<span class="close" 
					        						ng-show="board_img" ng-click="board_img = ''">x</span>
										        	<img ngf-src="board_img">
										        </div>
										    </div>
					        			</div>
					        		</div>
							  	</div>
							</div>
	        				<!--FIRST BOARD-->
	        				<div class="panel panel-info">
							  	<div class="panel-heading">BOARD FIRST</div>
							  	<div class="panel-body">
					        		<div class="row">
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.name.$touched && addBoard.name.$invalid || addBoard.$submitted && addBoard.name.$invalid, 'has-success' : addBoard.name.$touched && addBoard.name.$valid}">
										        <label for="nameBoard">Nazwa</label>
										        <input type="text" class="form-control" id="nameBoard" placeholder="DESKA TARASOWA BLOOMA" required name="name"
										        data-ng-model="name">
										    </div>
					        			</div>
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.brand.$touched && addBoard.brand.$invalid || addBoard.$submitted && addBoard.brand.$invalid, 'has-success' : addBoard.brand.$touched && addBoard.brand.$valid}">
										        <label for="brandBoard">Producent</label>
										        <input type="text" class="form-control" id="brandBoard" placeholder="SZARA" required name="brand"
										        data-ng-model="brand">
										    </div>
					        			</div>
					        		</div>
					        		<div class="row">
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.height.$touched && addBoard.height.$invalid || addBoard.$submitted && addBoard.height.$invalid, 'has-success' : addBoard.height.$touched && addBoard.height.$valid}">
										        <label for="heightBoard">Długość, mm</label>
										        <input type="number" class="form-control" id="heightBoard" placeholder="2400" required name="height"
										        data-ng-model="height">
										    </div>
					        			</div>
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.width.$touched && addBoard.width.$invalid || addBoard.$submitted && addBoard.width.$invalid, 'has-success' : addBoard.width.$touched && addBoard.width.$valid}">
										        <label for="widthBoard">Szerokość, mm</label>
										        <input type="number" class="form-control" id="widthBoard" placeholder="110" required name="width"
										        data-ng-model="width">
										    </div>
					        			</div>
					        		</div>
					        		<div class="row">
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.thickness.$touched && addBoard.thickness.$invalid || addBoard.$submitted && addBoard.thickness.$invalid, 'has-success' : addBoard.thickness.$touched && addBoard.thickness.$valid}">
										        <label for="thicknessBoard">Wysokość, mm</label>
										        <input type="number" class="form-control" id="thicknessBoard" placeholder="25" required name="thickness"
										        data-ng-model="thickness">
										    </div>
					        			</div>
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.type.$touched && addBoard.type.$invalid || addBoard.$submitted && addBoard.type.$invalid, 'has-success' : addBoard.type.$touched && addBoard.type.$valid}">
										        <label for="typeBoard">Typ</label>
										        <select class="form-control" id="typeBoard" required name="type" 
										        data-ng-model="type">
												  	<option value="kompozyt" selected="selected">KOMPOZYTOWA</option>
												  	<option value="drevniana">DREWNIANA</option>
												</select>
										    </div>
					        			</div>
					        		</div>
					        		<div class="row">
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.price.$touched && addBoard.price.$invalid || addBoard.$submitted && addBoard.price.$invalid, 'has-success' : addBoard.price.$touched && addBoard.price.$valid}">
										        <label for="priceBoard">Cena, PLN</label>
										        <input type="number" class="form-control" id="priceBoard" placeholder="85" type="number" min="1" step="1" required name="price"
										        data-ng-model="price">
										    </div>
					        			</div>
					        		</div>
							  	</div>
							</div>
							<!--SECOND BOARD-->
							<button type="button" class="btn btn-success btn_board"
							ng-click="btn_board_panel = ! btn_board_panel">Add two board</button>
							<div class="panel panel-info animate-if" ng-if="btn_board_panel">
							  	<div class="panel-heading">BOARD SECOND</div>
							  	<div class="panel-body">
					        		<div class="row">
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.nameSecond.$touched && addBoard.namSeconde.$invalid || addBoard.$submitted && addBoard.nameSecond.$invalid, 'has-success' : addBoard.nameSecond.$touched && addBoard.nameSecond.$valid}">
										        <label for="nameBoard">Nazwa</label>
										        <input type="text" class="form-control" id="nameBoardSecond" placeholder="DESKA TARASOWA BLOOMA" required name="nameSecond"
										        data-ng-model="nameSecond">
										    </div>
					        			</div>
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.brandSecond.$touched && addBoard.brandSecond.$invalid || addBoard.$submitted && addBoard.brandSecond.$invalid, 'has-success' : addBoard.brandSecond.$touched && addBoard.brandSecond.$valid}">
										        <label for="brandBoard">Producent</label>
										        <input type="text" class="form-control" id="brandBoardSecond" placeholder="SZARA" required name="brandSecond"
										        data-ng-model="brandSecond">
										    </div>
					        			</div>
					        		</div>
					        		<div class="row">
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.heightSecond.$touched && addBoard.heightSecond.$invalid || addBoard.$submitted && addBoard.heightSecond.$invalid, 'has-success' : addBoard.heightSecond.$touched && addBoard.height.$valid}">
										        <label for="heightBoard">Długość, mm</label>
										        <input type="number" class="form-control" id="heightBoardSecond" placeholder="2400" required name="heightSecond"
										        data-ng-model="heightSecond">
										    </div>
					        			</div>
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.widthSecond.$touched && addBoard.widthSecond.$invalid || addBoard.$submitted && addBoard.widthSecond.$invalid, 'has-success' : addBoard.widthSecond.$touched && addBoard.widthSecond.$valid}">
										        <label for="widthBoard">Szerokość, mm</label>
										        <input type="number" class="form-control" id="widthBoardSecond" placeholder="110" required name="widthSecond"
										        data-ng-model="widthSecond">
										    </div>
					        			</div>
					        		</div>
					        		<div class="row">
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.thicknessSecond.$touched && addBoard.thicknessSecond.$invalid || addBoard.$submitted && addBoard.thicknessSecond.$invalid, 'has-success' : addBoard.thicknessSecond.$touched && addBoard.thicknessSecond.$valid}">
										        <label for="thicknessBoard">Wysokość, mm</label>
										        <input type="number" class="form-control" id="thicknessBoardSecond" placeholder="25" required name="thicknessSecond"
										        data-ng-model="thicknessSecond">
										    </div>
					        			</div>
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.typeSecond.$touched && addBoard.typeSecond.$invalid || addBoard.$submitted && addBoard.typeSecond.$invalid, 'has-success' : addBoard.typeSecond.$touched && addBoard.typeSecond.$valid}">
										        <label for="typeBoard">Typ</label>
										        <select class="form-control" id="typeBoardSecond" required name="typeSecond" 
										        data-ng-model="typeSecond">
												  	<option value="kompozyt" selected="selected">KOMPOZYTOWA</option>
												  	<option value="drevniana">DREWNIANA</option>
												</select>
										    </div>
					        			</div>
					        		</div>
					        		<div class="row">
					        			<div class="col-md-6">
					        				<div class="form-group"
					        				data-ng-class="{'has-error' : addBoard.priceSecond.$touched && addBoard.priceSecond.$invalid || addBoard.$submitted && addBoard.priceSecond.$invalid, 'has-success' : addBoard.priceSecond.$touched && addBoard.priceSecond.$valid}">
										        <label for="priceBoard">Cena, PLN</label>
										        <input type="number" class="form-control" id="priceBoardSecond" placeholder="85" type="number" min="1" step="1" required name="priceSecond"
										        data-ng-model="priceSecond">
										    </div>
					        			</div>
					        		</div>
							  	</div>
							</div>
	        			</div>
	        		</div>
	        		<div class="row">
	        			<div class="col-md-6">
	        				<div class="form-group">
						        <button type="submit" class="btn btn-info"
						        data-ng-click="add()" ng-disabled="addBoard.$invalid">Add</button>
						    </div>
	        			</div>
	        		</div>
	        	</form>
	      	</div>
	    </div>
  	</div>
</div>
<!-- END MODAL ADD BOARDS -->