#!/bin/bash
root=`pwd`
upperCaseName="$(tr '[:lower:]' '[:upper:]' <<< ${1:0:1})${1:1}"
folder=$root/src/api/${upperCaseName}
mkdir -p $folder
index=$folder/index.ts
service=$folder/$1Service.ts
controller=$folder/$1Controller.ts
model=$folder/$1Model.ts
router=$folder/$1Router.ts
validation=$folder/$1Validation.ts

if [ -f "$index" ]; then
    echo "$index exist"
else
    cat >$index <<EOF
export {${1}Router} from './${1}Router';
EOF
fi

if [ -f "$service" ]; then
    echo "$service exist"
else
    cat >$service <<EOF
export class ${upperCaseName}Service {

}
EOF
fi

if [ -f "$controller" ]; then
    echo "$controller exist"
else
    cat >$controller <<EOF
import { BaseController } from './../baseController';
import { ${upperCaseName}Service } from './${1}Service';

export class ${upperCaseName}Controller extends BaseController{
    private ${upperCaseName}Service = new ${upperCaseName}Service();

}
EOF
fi

if [ -f "$model" ]; then
    echo "$model exist"
else
    cat >$model <<EOF
import { Entity, ObjectIdColumn,  UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm-plus';

@Entity({ orderBy: { createdAt: "DESC"}})
export class ${upperCaseName} extends BaseEntity {
    @ObjectIdColumn()
    public id: string;

     @UpdateDateColumn()
    public updatedAt: Date;

    @CreateDateColumn()
    public createdAt: Date;

}
EOF
fi

if [ -f "$router" ]; then
    echo "$router exist"
else
    cat >$router <<EOF
import express from 'express';
import { controllerHandler } from '../../utils';
import { validation } from '../../middlewares';
import { ${upperCaseName}ValidationSchema } from './${1}Validation';
import { ${upperCaseName}Controller } from './${1}Controller';


const router = express.Router();
const call = controllerHandler;
const ${upperCaseName} = new ${upperCaseName}Controller();

router.use(validation(${upperCaseName}ValidationSchema));

router.get('/', call(${upperCaseName}.getMethod, (req, _res, _next) => []));


export const $1Router = router;
EOF
fi

if [ -f "$validation" ]; then
    echo "$validation exist"
else
    cat >$validation <<EOF
import Joi from 'joi';

export const ${upperCaseName}ValidationSchema = Joi.object().keys({
});
EOF
fi

indexFile=$root/src/api/index.ts
exportPath="export * from './${upperCaseName}';"
echo -e "$(cat $indexFile)\n$exportPath" > $indexFile
#lint files
echo "==============================================="
echo "Linting files..."
echo "==============================================="

npx tslint -p "./tsconfig.json" "${folder}/**.ts" --fix

echo "Done"
