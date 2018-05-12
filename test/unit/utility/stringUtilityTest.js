/**
 * CDAV Library
 *
 * This library is part of the Nextcloud project
 *
 * @author Georg Ehrke
 * @copyright 2018 Georg Ehrke <oc.list@georgehrke.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
import * as StringUtility from '../../../src/utility/stringUtility.js';

describe('StringUtility', () => {
    it('should return a unique identifier', function () {
        const uid = StringUtility.uid();

        expect(uid).toEqual(jasmine.any(String));
        expect(uid).toEqual(uid.toUpperCase());
    });

    it('should return a unique identifier with a prefix and/or a suffix', function () {
        const uid1 = StringUtility.uid('foobar');

        expect(uid1).toEqual(jasmine.any(String));
        expect(uid1.startsWith('foobar-')).toEqual(true);

        const uid2 = StringUtility.uid(null, 'ics');

        expect(uid2).toEqual(jasmine.any(String));
        expect(uid2.endsWith('.ics')).toEqual(true);

        const uid3 = StringUtility.uid('foobar', 'ics');

        expect(uid3).toEqual(jasmine.any(String));
        expect(uid3.startsWith('foobar-')).toEqual(true);
        expect(uid3.endsWith('.ics')).toEqual(true);
    });

	it('should return the uri if it\'s available', function() {
		const isAvailable = jasmine.createSpy().and.returnValue(true);
		const uri = StringUtility.uri('abc', isAvailable);

		expect(uri).toEqual('abc');
		expect(isAvailable).toHaveBeenCalledWith('abc');
		expect(isAvailable.calls.count()).toEqual(1);
	});

	it('should not return an empty uri', function() {
		const isAvailable = jasmine.createSpy().and.returnValue(true);
		const uri = StringUtility.uri('', isAvailable);

		expect(uri).toEqual('-');
		expect(isAvailable).toHaveBeenCalledWith('-');
		expect(isAvailable.calls.count()).toEqual(1);
	});

	it('should be able to append -1 to the name', function() {
		const isAvailable = jasmine.createSpy().and.returnValues(false, true);
		const uri = StringUtility.uri('abc', isAvailable);

		expect(uri).toEqual('abc-1');
		expect(isAvailable.calls.argsFor(0)).toEqual(['abc']);
		expect(isAvailable.calls.argsFor(1)).toEqual(['abc-1']);
		expect(isAvailable.calls.count()).toEqual(2);
	});

	it('should be able to append 1 to the name if name contains - at the end', function() {
		const isAvailable = jasmine.createSpy().and.returnValues(false, true);
		const uri = StringUtility.uri('abc-', isAvailable);

		expect(uri).toEqual('abc-1');
		expect(isAvailable.calls.argsFor(0)).toEqual(['abc']);
		expect(isAvailable.calls.argsFor(1)).toEqual(['abc-1']);
		expect(isAvailable.calls.count()).toEqual(2);
	});

	it('should be able to append 1 to the name if name contains - in the middle', function() {
		const isAvailable = jasmine.createSpy().and.returnValues(false, true);
		const uri = StringUtility.uri('a-bc', isAvailable);

		expect(uri).toEqual('a-bc-1');
		expect(isAvailable.calls.argsFor(0)).toEqual(['a-bc']);
		expect(isAvailable.calls.argsFor(1)).toEqual(['a-bc-1']);
		expect(isAvailable.calls.count()).toEqual(2);
	});

	it('should be able to append number to the name if name contains - in the middle', function() {
		const isAvailable = jasmine.createSpy().and.returnValues(false, false, false, false, true);
		const uri = StringUtility.uri('a-bc', isAvailable);

		expect(uri).toEqual('a-bc-4');
		expect(isAvailable.calls.argsFor(0)).toEqual(['a-bc']);
		expect(isAvailable.calls.argsFor(1)).toEqual(['a-bc-1']);
		expect(isAvailable.calls.argsFor(2)).toEqual(['a-bc-2']);
		expect(isAvailable.calls.argsFor(3)).toEqual(['a-bc-3']);
		expect(isAvailable.calls.argsFor(4)).toEqual(['a-bc-4']);
		expect(isAvailable.calls.count()).toEqual(5);
	});

	it('should be lowercase', function() {
		const isAvailable = jasmine.createSpy().and.returnValues(false, true);
		const uri = StringUtility.uri('A-BC', isAvailable);

		expect(uri).toEqual('a-bc-1');
		expect(isAvailable.calls.argsFor(0)).toEqual(['a-bc']);
		expect(isAvailable.calls.argsFor(1)).toEqual(['a-bc-1']);
		expect(isAvailable.calls.count()).toEqual(2);
	});

	it('should work with emojis', function() {
		const isAvailable = jasmine.createSpy().and.returnValues(false, true);
		const uri = StringUtility.uri('💁🏼-123', isAvailable);

		expect(uri).toEqual('123-1');
		expect(isAvailable.calls.argsFor(0)).toEqual(['123']);
		expect(isAvailable.calls.argsFor(1)).toEqual(['123-1']);
		expect(isAvailable.calls.count()).toEqual(2);
	});
});
