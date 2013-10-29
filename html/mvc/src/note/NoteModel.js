/**
 * 笔记model
 * @author yiminghe@gmail.com
 */
KISSY.add('NoteModel', function(S, mvc) {
    /*
     笔记模型
     */
    function NoteModel() {
        NoteModel.superclass.constructor.apply(this, arguments);
    }

    S.extend(NoteModel, mvc.Model);

    return NoteModel;


}, {
    requires:["mvc"]
});
