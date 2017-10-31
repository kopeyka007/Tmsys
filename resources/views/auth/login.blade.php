<div class="wrapper" data-ng-controller="AuthController">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="box-logo">
					<div class="logo-light text-center">
						<img src="/storage/images/logo-white.png" alt="TMsys">
					</div>
					<p class="text-center">
						Program RazTaraz pozwala na szybki dobór technologii wykonania tarasu <br>
						a także kalkulacje kosztów materiałowych
					</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="admin-form">
					<form name="form_signin" novalidate="novalidate">
					 	<div class="form-group">	  
					    	<input type="email" placeholder="Email Adress" name="email" required="required" class="form-control"
					    	data-ng-class="{'has-error' : form_signin.email.$touched && form_signin.email.$invalid || form_signin.$submitted && form_signin.email.$invalid, 'has-success' : form_signin.email.$touched && form_signin.email.$valid}" data-ng-model="email">
					 	</div>
					 	<div class="form-group">
					    	<input type="password" placeholder="Hasło" name="password" required="required" class="form-control"
					    	data-ng-class="{'has-error' : form_signin.password.$touched && form_signin.password.$invalid || form_signin.$submitted && form_signin.password.$invalid, 'has-success' : form_signin.password.$touched && form_signin.password.$valid}" data-ng-model="password">
					 	</div>
					 	<div class="form-group">
					    	<button type="submit" class="btn-main text-center" 
					    	data-ng-click="signin()">Отправить</button>
					 	</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>