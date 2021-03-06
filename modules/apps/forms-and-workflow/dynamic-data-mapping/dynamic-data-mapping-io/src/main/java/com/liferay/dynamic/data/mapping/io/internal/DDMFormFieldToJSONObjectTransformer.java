/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.dynamic.data.mapping.io.internal;

import com.liferay.dynamic.data.mapping.form.field.type.DDMFormFieldType;
import com.liferay.dynamic.data.mapping.form.field.type.DDMFormFieldTypeServicesTracker;
import com.liferay.dynamic.data.mapping.form.field.type.DDMFormFieldTypeSettings;
import com.liferay.dynamic.data.mapping.form.field.type.DefaultDDMFormFieldTypeSettings;
import com.liferay.dynamic.data.mapping.model.DDMForm;
import com.liferay.dynamic.data.mapping.model.DDMFormField;
import com.liferay.dynamic.data.mapping.model.DDMFormFieldOptions;
import com.liferay.dynamic.data.mapping.model.DDMFormFieldValidation;
import com.liferay.dynamic.data.mapping.model.LocalizedValue;
import com.liferay.dynamic.data.mapping.util.DDMFormFactory;
import com.liferay.portal.kernel.json.JSONArray;
import com.liferay.portal.kernel.json.JSONFactory;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.LocaleUtil;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

/**
 * @author Marcellus Tavares
 */
public class DDMFormFieldToJSONObjectTransformer {

	public DDMFormFieldToJSONObjectTransformer(
		DDMFormFieldTypeServicesTracker ddmFormFieldTypeServicesTracker,
		JSONFactory jsonFactory) {

		_ddmFormFieldTypeServicesTracker = ddmFormFieldTypeServicesTracker;
		_jsonFactory = jsonFactory;
	}

	public JSONObject transform(DDMFormField ddmFormField) {
		JSONObject jsonObject = toJSONObject(ddmFormField);

		return jsonObject;
	}

	protected void addNestedFields(
		JSONObject jsonObject, List<DDMFormField> nestedDDMFormFields) {

		if (nestedDDMFormFields.isEmpty()) {
			return;
		}

		jsonObject.put("nestedFields", fieldsToJSONArray(nestedDDMFormFields));
	}

	protected void addProperties(
		JSONObject jsonObject, DDMFormField ddmFormField) {

		DDMForm ddmFormFieldTypeSettingsDDMForm =
			getDDMFormFieldTypeSettingsDDMForm(ddmFormField.getType());

		for (DDMFormField ddmFormFieldTypeSetting :
				ddmFormFieldTypeSettingsDDMForm.getDDMFormFields()) {

			addProperty(jsonObject, ddmFormField, ddmFormFieldTypeSetting);
		}
	}

	protected void addProperty(
		JSONObject jsonObject, DDMFormField ddmFormField,
		DDMFormField ddmFormFieldTypeSetting) {

		Object property = ddmFormField.getProperty(
			ddmFormFieldTypeSetting.getName());

		if (property == null) {
			return;
		}

		addProperty(
			jsonObject, ddmFormFieldTypeSetting.getName(),
			serializeDDMFormFieldProperty(property, ddmFormFieldTypeSetting));
	}

	protected void addProperty(
		JSONObject jsonObject, String propertyName, Object propertyValue) {

		if (propertyValue == null) {
			return;
		}

		jsonObject.put(propertyName, propertyValue);
	}

	protected JSONArray fieldsToJSONArray(List<DDMFormField> ddmFormFields) {
		JSONArray jsonArray = _jsonFactory.createJSONArray();

		for (DDMFormField ddmFormField : ddmFormFields) {
			jsonArray.put(toJSONObject(ddmFormField));
		}

		return jsonArray;
	}

	protected DDMForm getDDMFormFieldTypeSettingsDDMForm(String type) {
		DDMFormFieldType ddmFormFieldType =
			_ddmFormFieldTypeServicesTracker.getDDMFormFieldType(type);

		Class<? extends DDMFormFieldTypeSettings> ddmFormFieldTypeSettings =
			DefaultDDMFormFieldTypeSettings.class;

		if (ddmFormFieldType != null) {
			ddmFormFieldTypeSettings =
				ddmFormFieldType.getDDMFormFieldTypeSettings();
		}

		return DDMFormFactory.create(ddmFormFieldTypeSettings);
	}

	protected JSONArray optionsToJSONArray(
		DDMFormFieldOptions ddmFormFieldOptions) {

		Set<String> optionValues = ddmFormFieldOptions.getOptionsValues();

		if (optionValues.isEmpty()) {
			return null;
		}

		JSONArray jsonArray = _jsonFactory.createJSONArray();

		for (String optionValue : optionValues) {
			JSONObject jsonObject = _jsonFactory.createJSONObject();

			jsonObject.put(
				"label",
				toJSONObject(ddmFormFieldOptions.getOptionLabels(optionValue)));
			jsonObject.put("value", optionValue);

			jsonArray.put(jsonObject);
		}

		return jsonArray;
	}

	protected Object serializeDDMFormFieldProperty(
		Object property, DDMFormField ddmFormFieldTypeSetting) {

		if (ddmFormFieldTypeSetting.isLocalizable()) {
			return toJSONObject((LocalizedValue)property);
		}

		String dataType = ddmFormFieldTypeSetting.getDataType();

		if (Objects.equals(dataType, "boolean")) {
			return GetterUtil.getBoolean(property);
		}
		else if (Objects.equals(dataType, "ddm-options")) {
			return optionsToJSONArray((DDMFormFieldOptions)property);
		}
		else if (Objects.equals(
					ddmFormFieldTypeSetting.getType(), "validation")) {

			return toJSONObject((DDMFormFieldValidation)property);
		}
		else {
			return String.valueOf(property);
		}
	}

	protected JSONObject toJSONObject(DDMFormField ddmFormField) {
		JSONObject jsonObject = _jsonFactory.createJSONObject();

		addProperties(jsonObject, ddmFormField);

		addNestedFields(jsonObject, ddmFormField.getNestedDDMFormFields());

		return jsonObject;
	}

	protected JSONObject toJSONObject(
		DDMFormFieldValidation ddmFormFieldValidation) {

		if (ddmFormFieldValidation == null) {
			return null;
		}

		JSONObject jsonObject = _jsonFactory.createJSONObject();

		jsonObject.put(
			"errorMessage", ddmFormFieldValidation.getErrorMessage());
		jsonObject.put("expression", ddmFormFieldValidation.getExpression());

		return jsonObject;
	}

	protected JSONObject toJSONObject(LocalizedValue localizedValue) {
		Map<Locale, String> values = localizedValue.getValues();

		if (values.isEmpty()) {
			return null;
		}

		JSONObject jsonObject = _jsonFactory.createJSONObject();

		for (Locale availableLocale : localizedValue.getAvailableLocales()) {
			jsonObject.put(
				LocaleUtil.toLanguageId(availableLocale),
				localizedValue.getString(availableLocale));
		}

		return jsonObject;
	}

	private final DDMFormFieldTypeServicesTracker
		_ddmFormFieldTypeServicesTracker;
	private final JSONFactory _jsonFactory;

}