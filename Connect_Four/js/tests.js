var res = [
[-1,  0, -1, -1,  0,  0,  0,  0],
[-1,  0, -1, -1, -1, -1, -1, -1],
[-1,  0, -1,  1,  1,  1, -1, -1],
[-1,  0, -1, -1, -1, -1, -1, -1],
[-1, -1, -1,  1,  1, -1, -1, -1],
[-1, -1,  1, -1, -1,  1, -1, -1],
[-1,  1, -1, -1, -1, -1,  1, -1],
[ 1, -1, -1, -1, -1, -1, -1,  1],
];

test("check_board test",  function() {
	equal(check_board(res, 0, 1), true);
	equal(check_board(res, 1, 1), true);
	equal(check_board(res, 2, 1), true);
    equal(check_board(res, 3, 1), true);

	equal(check_board(res, 0, 7), true);
	equal(check_board(res, 0, 6), true);
	equal(check_board(res, 0, 5), true);
    equal(check_board(res, 0, 4), true);

    equal(check_board(res, 7, 7), true);
    equal(check_board(res, 6, 6), true);
    equal(check_board(res, 5, 5), true);
    equal(check_board(res, 4, 4), true);

    equal(check_board(res, 7, 0), true);
    equal(check_board(res, 6, 1), true);
    equal(check_board(res, 5, 2), true);
    equal(check_board(res, 4, 3), true);

    equal(check_board(res, 2, 4), false);
    equal(check_board(res, 2, 5), false);
    equal(check_board(res, 2, 6), false);

    equal(check_board(res, 3, 3), false);    
});
